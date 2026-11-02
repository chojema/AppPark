(function () {
  var STORAGE_KEY = "language";

  var text = {
    ko: {
      description: "AIUsageWidget, Chojema Dooroo, Chojema Editor 등 여러 앱을 모아 둔 곳입니다.",
      platformsLabel: "지원 환경",
      widgetLine: "AI 코딩 도구의 남은 사용량을 터미널 바로 아래에서 확인합니다.",
      copyKeepLine: "텍스트와 이미지의 복사 기록을 저장하고, 단축키로 불러와 붙여넣는 클립보드 관리 앱입니다.",
      doorooLine: "HWPX와 HWP 문서를 위한 데스크톱 워드 프로세서입니다.",
      editorLine: "Markdown과 HTML을 보이는 그대로 편집하고, TXT, JSON, SVG 등도 다루는 텍스트 편집기입니다.",
      inputLensLine: "누른 키와 마우스 입력을 화면에 잠깐 보여 주는 가벼운 입력 표시(OSD) 앱입니다.",
      webDeltaLine: "등록해 둔 웹페이지의 변경 여부를 확인하는 로컬 앱입니다.",
      countdownLine: "시험장 등에서 현재 시각과 종료 시각, 남은 시간을 화면에 표시합니다.",
      keyStampLine: "Windows와 Mac 키보드 키캡 이미지와 애니메이션을 만드는 데스크톱 앱입니다.",
      viewOnGitHub: "GitHub에서 보기",
      readArticle: "소개 글 보기"
    },
    en: {
      description: "A home for AIUsageWidget, Chojema Dooroo, Chojema Editor, and more.",
      platformsLabel: "Available on",
      widgetLine: "See the remaining usage of your AI coding tools, right below your terminal.",
      copyKeepLine: "A clipboard manager that saves copied text and images and lets you recall and paste them with a keyboard shortcut.",
      doorooLine: "A desktop word processor for HWPX and HWP documents.",
      editorLine: "A text editor that lets you edit Markdown and HTML as they appear, and also handles TXT, JSON, SVG, and more.",
      inputLensLine: "A lightweight on-screen display (OSD) app that briefly shows key presses and mouse input.",
      webDeltaLine: "A local app that checks whether the web pages you registered have changed.",
      countdownLine: "Keep the current time, end time, and time remaining on screen, in an exam room or anywhere else.",
      keyStampLine: "A desktop app for creating Windows and Mac keyboard keycap images and animations.",
      viewOnGitHub: "View on GitHub",
      readArticle: "Read the article"
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
