// Tạo giao diện themes
function createThemeList() {
  const themeList = document.getElementById('theme-list');
  Object.entries(window.themes).forEach(([themeId, theme]) => {
    const div = document.createElement('div');
    div.className = 'theme-item';
    div.dataset.theme = themeId;
    div.textContent = theme.name;
    themeList.appendChild(div);
  });
}

// Tạo giao diện settings
function createSettingsList() {
  const settingsList = document.getElementById('settings-list');
  Object.entries(window.settings).forEach(([settingId, setting]) => {
    const div = document.createElement('div');
    div.className = 'setting-item';
    
    const label = document.createElement('label');
    label.htmlFor = setting.id;
    label.textContent = setting.name;
    
    if (setting.description) {
      const description = document.createElement('div');
      description.className = 'setting-description';
      description.textContent = setting.description;
      label.appendChild(description);
    }
    
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper';
    
    const input = document.createElement('input');
    input.type = setting.type;
    input.id = setting.id;
    
    const custom = document.createElement('div');
    custom.className = 'checkbox-custom';
    
    wrapper.appendChild(input);
    wrapper.appendChild(custom);
    div.appendChild(label);
    div.appendChild(wrapper);
    settingsList.appendChild(div);
  });
}

// Hiển thị modal xác nhận
function showConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  modal.classList.add('active');
}

// Ẩn modal xác nhận
function hideConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  modal.classList.remove('active');
}

// Reset tất cả cài đặt về mặc định
function resetToDefault() {
  // Xóa tất cả dữ liệu trong storage
  chrome.storage.sync.clear(() => {
    // Cập nhật giao diện
    updateActiveTheme('default');
    
    // Reset các settings về mặc định
    Object.entries(window.settings).forEach(([settingId, setting]) => {
      const input = document.getElementById(setting.id);
      if (input) {
        input.checked = setting.default;
      }
    });
    
    // Gửi message đến content script để cập nhật
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'resetSettings',
        theme: 'default',
        settings: Object.fromEntries(
          Object.entries(window.settings).map(([id, setting]) => [id, setting.default])
        )
      });
    });

    // Reload trang sau khi xóa cài đặt
    chrome.tabs.reload();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Tạo giao diện
  createThemeList();
  createSettingsList();

  // Lấy theme và settings đã lưu từ storage
  chrome.storage.sync.get([window.storageKeys.currentTheme, window.storageKeys.settings], (result) => {
    const currentTheme = result[window.storageKeys.currentTheme] || 'default';
    const savedSettings = result[window.storageKeys.settings] || {};
    
    // Cập nhật theme đang chọn
    updateActiveTheme(currentTheme);
    
    // Cập nhật trạng thái các settings
    Object.entries(window.settings).forEach(([settingId, setting]) => {
      const value = savedSettings[settingId] ?? setting.default;
      const input = document.getElementById(setting.id);
      if (input) {
        input.checked = value;
      }
    });
  });

  // Thêm sự kiện click cho các theme
  document.querySelectorAll('.theme-item').forEach(item => {
    item.addEventListener('click', () => {
      const theme = item.dataset.theme;
      applyTheme(theme);
    });
  });

  // Thêm sự kiện change cho các settings
  Object.entries(window.settings).forEach(([settingId, setting]) => {
    const input = document.getElementById(setting.id);
    if (input) {
      input.addEventListener('change', (e) => {
        const value = e.target.checked;
        updateSetting(settingId, value);
      });
    }
  });

  // Thêm sự kiện click cho nút xóa cache
  document.getElementById('clear-cache').addEventListener('click', showConfirmModal);

  // Thêm sự kiện click cho nút hủy trong modal
  document.getElementById('cancel-clear').addEventListener('click', hideConfirmModal);

  // Thêm sự kiện click cho nút xác nhận trong modal
  document.getElementById('confirm-clear').addEventListener('click', () => {
    hideConfirmModal();
    resetToDefault();
  });

  // Đóng modal khi click bên ngoài
  document.getElementById('confirm-modal').addEventListener('click', (e) => {
    if (e.target.id === 'confirm-modal') {
      hideConfirmModal();
    }
  });
});

function updateActiveTheme(theme) {
  document.querySelectorAll('.theme-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.theme === theme) {
      item.classList.add('active');
    }
  });
}

function applyTheme(theme) {
  // Lưu theme mới vào storage
  chrome.storage.sync.set({ [window.storageKeys.currentTheme]: theme }, () => {
    updateActiveTheme(theme);
    
    // Gửi message đến content script để áp dụng theme
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeTheme',
          theme: theme
        });
      }
    });
  });
}

function updateSetting(settingId, value) {
  // Lấy settings hiện tại
  chrome.storage.sync.get([window.storageKeys.settings], (result) => {
    const currentSettings = result[window.storageKeys.settings] || {};
    
    // Cập nhật setting mới
    const newSettings = {
      ...currentSettings,
      [settingId]: value
    };
    
    // Lưu vào storage
    chrome.storage.sync.set({ [window.storageKeys.settings]: newSettings }, () => {
      // Gửi message đến content script để cập nhật
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateSettings',
            settings: newSettings
          });
        }
      });
    });
  });
} 