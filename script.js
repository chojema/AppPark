(function () {
  var STORAGE_KEY = "language";

  var text = {
    ko: {
      description: "AIUsageWidget, Chojema Dooroo, Chojema Editor를 모아 둔 곳입니다.",
      navLabel: "앱",
      widgetLine: "AI 코딩 도구의 남은 사용량을 터미널 바로 아래에서 확인합니다.",
      doorooLine: "HWPX와 HWP 문서를 위한 데스크톱 워드 프로세서입니다.",
      editorLine: "Markdown과 HTML을 보이는 그대로 편집하는 텍스트 편집기입니다.",
      viewOnGitHub: "GitHub에서 보기"
    },
    en: {
      description: "A home for AIUsageWidget, Chojema Dooroo, and Chojema Editor.",
      navLabel: "Apps",
      widgetLine: "See the remaining usage of your AI coding tools, right below your terminal.",
      doorooLine: "A desktop word processor for HWPX and HWP documents.",
      editorLine: "A text editor that lets you edit Markdown and HTML as they appear.",
      viewOnGitHub: "View on GitHub"
    }
  };

  var button = document.getElementById("language-switch");

  document.getElementById("copyright-year").textContent = new Date().getFullYear();

  function readSaved() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function save(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // The choice still applies to the current visit.
    }
  }

  function initialLanguage() {
    var saved = readSaved();
    if (text[saved]) return saved;
    return /^ko\b/i.test(navigator.language || "") ? "ko" : "en";
  }

  function apply(language) {
    var strings = text[language];
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = strings[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (element) {
      element.setAttribute("aria-label", strings[element.dataset.i18nLabel]);
    });
    document.querySelector('meta[name="description"]').content = strings.description;

    // The button is named in the language it switches to.
    var next = language === "ko" ? "en" : "ko";
    button.textContent = next === "en" ? "English" : "한국어";
    button.lang = next;
    button.dataset.next = next;
  }

  button.addEventListener("click", function () {
    var next = button.dataset.next;
    save(next);
    apply(next);
  });

  apply(initialLanguage());
  button.hidden = false;
})();
