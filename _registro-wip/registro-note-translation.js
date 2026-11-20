/* Translate chart notes locally. Chart data and saved notes retain their original text. */
(() => {
  const button = document.getElementById('translateVisitNotes');
  const status = document.getElementById('translateVisitStatus');
  if (!button || !status || !window.Translator || !window.LanguageDetector) return;

  const preference = 'coCMCamasca.translateVisitNotes';
  const chart = document.getElementById('patBody');
  const translated = new Map();
  let detector;
  let translator;
  let enabled = localStorage.getItem(preference) === 'true';
  let revision = 0;

  function updateControl() {
    button.hidden = getLang() !== 'en';
    if (button.hidden) {
      status.textContent = '';
      return;
    }
    button.textContent = t('notes_translate');
    button.title = t('notes_translate_scope');
    button.setAttribute('aria-description', t('notes_translate_scope'));
    button.setAttribute('aria-pressed', String(enabled));
  }

  function displayTranslation(note, translation) {
    const original = note.querySelector('[data-original-note]');
    const output = document.createElement('div');
    output.dataset.translatedNote = '';
    output.innerHTML = renderMarkdownInline(translation);
    const controls = document.createElement('div');
    controls.dataset.translatedNote = '';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ghost';
    toggle.textContent = t('notes_show_original');
    toggle.onclick = () => {
      output.hidden = !output.hidden;
      original.hidden = !output.hidden;
      toggle.textContent = t(output.hidden ? 'notes_show_translation' : 'notes_show_original');
    };
    controls.append(t('notes_from_spanish'), ' · ', toggle);
    original.hidden = true;
    note.append(output, controls);
  }

  async function updateNotes() {
    const current = ++revision;
    const notes = [...chart.querySelectorAll('[data-chart-note]')];
    for (const note of notes) {
      note.querySelectorAll('[data-translated-note]').forEach(element => element.remove());
      note.querySelector('[data-original-note]').hidden = false;
    }
    status.textContent = '';
    if (!enabled || getLang() !== 'en' || !notes.length) return;
    status.textContent = t('notes_translate_wait');
    try {
      detector ||= LanguageDetector.create();
      translator ||= Translator.create({sourceLanguage: 'es', targetLanguage: 'en'});
      const [languageDetector, spanishTranslator] = await Promise.all([detector, translator]);
      for (const note of notes) {
        if (revision !== current) return;
        const text = note.dataset.chartNote;
        if (!translated.has(text)) {
          const [language] = await languageDetector.detect(text);
          const matches = language?.detectedLanguage?.split('-')[0] === 'es';
          translated.set(text, matches ? await spanishTranslator.translate(text) : null);
        }
        const result = translated.get(text);
        if (revision === current && note.isConnected && result) displayTranslation(note, result);
      }
      if (revision === current) status.textContent = '';
    } catch {
      detector = undefined;
      translator = undefined;
      if (revision === current) {
        enabled = false;
        updateControl();
        status.textContent = t('notes_translate_error');
      }
    }
  }

  button.addEventListener('click', () => {
    enabled = !enabled;
    localStorage.setItem(preference, String(enabled));
    updateControl();
    void updateNotes();
  });
  new MutationObserver(() => void updateNotes()).observe(chart, {childList: true});
  window.visitNoteTranslation = {updateControl};
  updateControl();
})();
