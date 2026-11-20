/* Translate visit notes locally. Chart data and saved notes retain their original text. */
(() => {
  const button = document.getElementById('translateVisitNotes');
  const status = document.getElementById('translateVisitStatus');
  if (!button || !status || !window.Translator || !window.LanguageDetector) return;

  const preference = 'coCMCamasca.translateVisitNotes';
  const chart = document.getElementById('patBody');
  const translators = new Map();
  const translated = new Map();
  let detector;
  let enabled = localStorage.getItem(preference) === 'true';
  let revision = 0;

  function updateControl() {
    button.hidden = false;
    button.textContent = t('notes_translate');
    button.title = t('notes_translate_scope');
    button.setAttribute('aria-description', t('notes_translate_scope'));
    button.setAttribute('aria-pressed', String(enabled));
  }

  function displayTranslation(note, translation, source) {
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
    controls.append(t(source === 'es' ? 'notes_from_spanish' : 'notes_from_english'), ' · ', toggle);
    original.hidden = true;
    note.append(output, controls);
  }

  async function updateNotes() {
    const current = ++revision;
    const notes = [...chart.querySelectorAll('[data-visit-note]')];
    for (const note of notes) {
      note.querySelectorAll('[data-translated-note]').forEach(element => element.remove());
      note.querySelector('[data-original-note]').hidden = false;
    }
    status.textContent = '';
    if (!enabled || !notes.length) return;

    const targetLanguage = getLang() === 'en' ? 'en' : 'es';
    const sourceLanguage = targetLanguage === 'en' ? 'es' : 'en';
    status.textContent = t('notes_translate_wait');
    try {
      detector ||= LanguageDetector.create();
      if (!translators.has(targetLanguage)) {
        translators.set(targetLanguage, Translator.create({sourceLanguage, targetLanguage}));
      }
      const [languageDetector, translator] = await Promise.all([detector, translators.get(targetLanguage)]);
      for (const note of notes) {
        if (revision !== current) return;
        const text = note.dataset.visitNote;
        const key = targetLanguage + ':' + text;
        if (!translated.has(key)) {
          const [language] = await languageDetector.detect(text);
          const matches = language?.detectedLanguage?.split('-')[0] === sourceLanguage;
          translated.set(key, matches ? await translator.translate(text) : null);
        }
        const result = translated.get(key);
        if (revision === current && note.isConnected && result) displayTranslation(note, result, sourceLanguage);
      }
      if (revision === current) status.textContent = '';
    } catch {
      detector = undefined;
      translators.delete(targetLanguage);
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
