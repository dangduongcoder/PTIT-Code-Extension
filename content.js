// Hàm áp dụng theme
function applyTheme(theme) {
  // Xóa các theme cũ
  document.querySelectorAll('link[data-theme]').forEach(link => {
    link.remove();
  });
  document.querySelectorAll('script[data-theme]').forEach(script => {
    script.remove();
  });

  // Thêm CSS mới
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = chrome.runtime.getURL(`themes/${theme}.css`);
  cssLink.setAttribute('data-theme', theme);
  document.head.appendChild(cssLink);

  // Thêm JavaScript mới
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(`themes/${theme}.js`);
  script.setAttribute('data-theme', theme);
  document.body.appendChild(script);
}

// Hàm thực thi các handler dựa trên settings
function executeHandlers(currentSettings) {
  // Xóa các handler cũ nếu có
  const oldHandlers = document.querySelectorAll('.setting-handler');
  oldHandlers.forEach(handler => handler.remove());

  // Thực thi các handler mới
  Object.entries(currentSettings).forEach(([settingId, value]) => {
    if (value && window.settingHandlers[settingId]) {
      // Thực thi handler
      window.settingHandlers[settingId]();
    }
  });
}

// Hàm khởi tạo
function initialize() {
  // Lấy theme và settings từ storage
  chrome.storage.sync.get(['currentTheme', 'settings'], (result) => {
    const theme = result.currentTheme || 'default';
    const currentSettings = result.settings || {};
    
    // Áp dụng theme
    applyTheme(theme);
    
    // Thực thi các handler
    executeHandlers(currentSettings);
  });
}

// Lắng nghe message từ popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeTheme') {
    // Xử lý thay đổi theme
    applyTheme(message.theme);
  } else if (message.action === 'updateSettings') {
    // Xử lý cập nhật settings
    executeHandlers(message.settings);
  } else if (message.action === 'resetSettings') {
    // Xử lý reset settings
    executeHandlers(message.settings);
  }
});

// Khởi tạo khi trang load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
} 