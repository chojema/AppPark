(function () {
  var STORAGE_KEY = "language";
  var CANONICAL_URL = "https://chojema.github.io/AppPark/";
  var PAGE_TITLE = "Chojema App Park";
  var SHARE_DESCRIPTION = "A collection of useful Windows and Mac apps including AIUsageWidget, Chojema Dooroo, Chojema Editor, and more. / AIUsageWidget, Chojema Dooroo, Chojema Editor 등 유용한 Windows와 Mac용 앱을 모아 둔 곳입니다.";
  var SHARE_SUMMARY = PAGE_TITLE + " — " + SHARE_DESCRIPTION;

  var text = {
    ko: {
      description: "AIUsageWidget, Chojema Dooroo, Chojema Editor 등 유용한 Windows와 Mac용 앱을 모아 둔 곳입니다.",
      shareButton: "공유",
      shareLabel: "이 페이지 공유",
      shareMenuLabel: "공유 대상",
      shareNaver: "네이버",
      shareBand: "밴드",
      copyLink: "링크 복사",
      copiedLink: "복사됨",
      moreShare: "더보기",
      platformsLabel: "지원 환경",
      widgetLine: "AI 코딩 도구의 남은 사용량을 터미널 바로 아래에서 확인합니다.",
      copyKeepLine: "텍스트와 이미지의 복사 기록을 저장하고, 단축키로 불러와 붙여넣는 클립보드 관리 앱입니다.",
      doorooLine: "HWPX와 HWP 문서를 위한 데스크톱 워드 프로세서입니다.",
      editorLine: "Markdown과 HTML을 보이는 그대로 편집하고, TXT, JSON, SVG 등도 다루는 텍스트 편집기입니다.",
      fileDeskLine: "로컬 폴더와 FTP·FTPS·SFTP 서버의 파일을 좌우 2패널에서 다루는 데스크톱 파일 관리자입니다.",
      imagePlusLine: "사진을 빠르게 훑어보고, 비교·정리·편집·변환까지 다루는 가벼운 이미지 뷰어입니다.",
      inputLensLine: "누른 키와 마우스 입력을 화면에 잠깐 보여 주는 가벼운 입력 표시(OSD) 앱입니다.",
      webDeltaLine: "등록해 둔 웹페이지의 변경 여부를 확인하는 로컬 앱입니다.",
      countdownLine: "시험장 등에서 현재 시각과 종료 시각, 남은 시간을 화면에 표시합니다.",
      keyStampLine: "Windows와 Mac 키보드 키캡 이미지와 애니메이션을 만드는 데스크톱 앱입니다.",
      officeLine: "문서·발표·PDF·이미지 앱을 한 창에서 설치·업데이트·실행하는 런처 앱입니다.",
      viewOnGitHub: "GitHub에서 보기",
      readArticle: "소개 글 보기"
    },
    en: {
      description: "A collection of useful Windows and Mac apps including AIUsageWidget, Chojema Dooroo, Chojema Editor, and more.",
      shareButton: "Share",
      shareLabel: "Share this page",
      shareMenuLabel: "Share targets",
      shareNaver: "Naver",
      shareBand: "Band",
      copyLink: "Copy link",
      copiedLink: "Copied",
      moreShare: "More",
      platformsLabel: "Available on",
      widgetLine: "See the remaining usage of your AI coding tools, right below your terminal.",
      copyKeepLine: "A clipboard manager that saves copied text and images and lets you recall and paste them with a keyboard shortcut.",
      doorooLine: "A desktop word processor for HWPX and HWP documents.",
      editorLine: "A text editor that lets you edit Markdown and HTML as they appear, and also handles TXT, JSON, SVG, and more.",
      fileDeskLine: "A two-pane desktop file manager for local folders and FTP, FTPS, and SFTP servers.",
      imagePlusLine: "A lightweight image viewer for browsing, comparing, organizing, editing, and converting photos quickly.",
      inputLensLine: "A lightweight on-screen display (OSD) app that briefly shows key presses and mouse input.",
      webDeltaLine: "A local app that checks whether the web pages you registered have changed.",
      countdownLine: "Keep the current time, end time, and time remaining on screen, in an exam room or anywhere else.",
      keyStampLine: "A desktop app for creating Windows and Mac keyboard keycap images and animations.",
      officeLine: "A desktop launcher for installing, updating, and opening writing, spreadsheet, presentation, PDF, and image apps from one window.",
      viewOnGitHub: "View on GitHub",
      readArticle: "Read the article"
    }
  };

  var button = document.getElementById("language-switch");
  var shareContainer = document.getElementById("share");
  var shareToggle = document.getElementById("share-toggle");
  var shareMenu = document.getElementById("share-menu");
  var shareCopy = document.getElementById("share-copy");
  var shareCopyText = document.getElementById("share-copy-text");
  var shareNative = document.getElementById("share-native");
  var currentLanguage = "ko";
  var copyTimer = null;

  document.getElementById("copyright-year").textContent = new Date().getFullYear();

  function shareUrl() {
    if (/^https?:/i.test(window.location.protocol) && !/^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)) {
      return window.location.href.split("#")[0];
    }
    return CANONICAL_URL;
  }

  function updateShareLinks() {
    var url = shareUrl();
    var encodedUrl = encodeURIComponent(url);
    var encodedSummary = encodeURIComponent(SHARE_SUMMARY);
    var encodedFull = encodeURIComponent(SHARE_SUMMARY + " " + url);
    var encodedBand = encodeURIComponent(SHARE_SUMMARY + "\n" + url);

    var map = {
      x: "https://twitter.com/intent/tweet?url=" + encodedUrl + "&text=" + encodedSummary,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl,
      threads: "https://www.threads.net/intent/post?text=" + encodedFull,
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl,
      reddit: "https://www.reddit.com/submit?url=" + encodedUrl + "&title=" + encodedSummary,
      telegram: "https://t.me/share/url?url=" + encodedUrl + "&text=" + encodedSummary,
      line: "https://social-plugins.line.me/lineit/share?url=" + encodedUrl + "&text=" + encodedSummary,
      naver: "https://share.naver.com/web/shareView?url=" + encodedUrl + "&title=" + encodedSummary,
      band: "https://band.us/plugin/share?body=" + encodedBand + "&route=" + encodedUrl
    };

    document.querySelectorAll("[data-share]").forEach(function (anchor) {
      var key = anchor.dataset.share;
      if (map[key]) anchor.href = map[key];
    });
  }

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
    currentLanguage = language;
    var strings = text[language];
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = strings[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (element) {
      element.setAttribute("aria-label", strings[element.dataset.i18nLabel]);
    });
    document.querySelector('meta[name="description"]').content = strings.description;

    updateShareLinks();

    // The button is named in the language it switches to.
    var next = language === "ko" ? "en" : "ko";
    button.textContent = next === "en" ? "English" : "한국어";
    button.lang = next;
    button.dataset.next = next;
  }

  function setShareOpen(open) {
    shareMenu.hidden = !open;
    shareToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function copyShareUrl() {
    var url = shareUrl();
    var done = function () {
      if (copyTimer) window.clearTimeout(copyTimer);
      shareCopyText.textContent = text[currentLanguage].copiedLink;
      copyTimer = window.setTimeout(function () {
        shareCopyText.textContent = text[currentLanguage].copyLink;
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () {
        fallbackCopy(url, done);
      });
    } else {
      fallbackCopy(url, done);
    }
  }

  function fallbackCopy(value, callback) {
    var input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      callback();
    } catch (error) {
      // Ignore copy errors if blocked by browser policy.
    }
    document.body.removeChild(input);
  }

  button.addEventListener("click", function () {
    var next = button.dataset.next;
    save(next);
    apply(next);
  });

  shareToggle.addEventListener("click", function () {
    setShareOpen(shareMenu.hidden);
  });

  shareMenu.addEventListener("click", function (event) {
    if (event.target.closest("a[data-share]")) {
      setShareOpen(false);
    }
  });

  shareCopy.addEventListener("click", function () {
    copyShareUrl();
  });

  if (typeof navigator.share === "function") {
    shareNative.hidden = false;
    shareNative.addEventListener("click", function () {
      setShareOpen(false);
      navigator.share({
        title: PAGE_TITLE,
        text: SHARE_SUMMARY,
        url: shareUrl()
      }).catch(function () {
        // User cancelled or share failed.
      });
    });
  }

  document.addEventListener("click", function (event) {
    if (!shareMenu.hidden && !shareContainer.contains(event.target)) {
      setShareOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !shareMenu.hidden) {
      setShareOpen(false);
      shareToggle.focus();
    }
  });

  apply(initialLanguage());
  button.hidden = false;
  shareContainer.hidden = false;
})();
