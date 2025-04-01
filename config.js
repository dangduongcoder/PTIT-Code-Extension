// Cấu hình themes
window.themes = {
  default: {
    name: 'Default Theme',
    css: 'themes/default.css',
    js: 'themes/default.js'
  },
  dark: {
    name: 'Dark Theme',
    css: 'themes/dark.css',
    js: 'themes/dark.js'
  },
  ghibli: {
    name: 'Ghibli Theme',
    css: 'themes/ghibli.css',
    js: 'themes/ghibli.js'
  },
  // custom: {
  //   name: 'Custom Theme',
  //   css: 'themes/custom.css',
  //   js: 'themes/custom.js'
  // }
};

// Các hàm xử lý cho từng setting
window.settingHandlers = {
  // Hàm xử lý cho setting hiện sao chép input/output
  showIO: () => {
    console.log("Đã vào đây");
    
    // Kiểm tra URL có đúng định dạng không
    if (!window.location.href.match(/https:\/\/code\.ptit\.edu\.vn\/student\/question\/.*/)) {
      return;
    }

    // Tìm tất cả các bảng testcase
    const tables = document.querySelectorAll('table.TableGrid1, table.MsoTableGrid');
    
    tables.forEach(table => {
      // Tìm các ô input và output trong bảng
      const rows = table.querySelectorAll('tr');
      
      rows.forEach((row, index) => {
        if (index === 0) return; // Bỏ qua hàng tiêu đề
        
        const cells = row.querySelectorAll('td');
        if (cells.length !== 2) return;

        const [inputCell, outputCell] = cells;

        // Tạo nút copy cho input
        const inputCopyBtn = document.createElement('button');
        inputCopyBtn.className = 'btn-copy-dang-duong';
        inputCopyBtn.textContent = 'Copy';
        inputCopyBtn.title = 'Sao chép input';
        inputCopyBtn.style.position = 'absolute';
        inputCopyBtn.style.top = '5px';
        inputCopyBtn.style.right = '5px';
        
        // Tạo nút copy cho output  
        const outputCopyBtn = document.createElement('button');
        outputCopyBtn.className = 'btn-copy-dang-duong';
        outputCopyBtn.textContent = 'Copy';
        outputCopyBtn.title = 'Sao chép output';
        outputCopyBtn.style.position = 'absolute';
        outputCopyBtn.style.top = '5px';
        outputCopyBtn.style.right = '5px';

        // Hàm lấy nội dung từ cell
        const getCellContent = (cell) => {
          const paragraphs = cell.querySelectorAll('p');
          return Array.from(paragraphs)
            .map(p => p.textContent.trim())
            .join('\n');
        };

        // Xử lý sự kiện click
        inputCopyBtn.onclick = () => {
          const text = getCellContent(inputCell);
          navigator.clipboard.writeText(text).then(() => {
            inputCopyBtn.textContent = 'Copied!';
            inputCopyBtn.classList.add('copied');
            setTimeout(() => {
              inputCopyBtn.textContent = 'Copy';
              inputCopyBtn.classList.remove('copied');
            }, 1000);
          });
        };

        outputCopyBtn.onclick = () => {
          const text = getCellContent(outputCell);
          navigator.clipboard.writeText(text).then(() => {
            outputCopyBtn.textContent = 'Copied!';
            outputCopyBtn.classList.add('copied');
            setTimeout(() => {
              outputCopyBtn.textContent = 'Copy';
              outputCopyBtn.classList.remove('copied');
            }, 1000);
          });
        };

        // Thêm nút vào các ô
        inputCell.style.position = 'relative';
        outputCell.style.position = 'relative';
        inputCell.appendChild(inputCopyBtn);
        outputCell.appendChild(outputCopyBtn);
      });
    });
  }
  // Thêm các hàm xử lý khác ở đây
  // example: () => {
  //   // Code xử lý cho setting example
  // }
};

// Cấu hình settings
window.settings = {
  showIO: {
    id: 'show-io',
    name: 'Hiện sao chép input/output',
    type: 'checkbox',
    default: false,
    description: 'Hiển thị nút sao chép cho input và output (Tải lại trang để tiện ích hoạt động)',
    handler: window.settingHandlers.showIO
  }
  // Thêm settings mới ở đây
  // example: {
  //   id: 'example-setting',
  //   name: 'Tên Setting',
  //   type: 'checkbox|select|text',
  //   default: false|'value'|'',
  //   description: 'Mô tả setting',
  //   handler: window.settingHandlers.example
  // }
};

// Cấu hình storage keys
window.storageKeys = {
  currentTheme: 'currentTheme',
  settings: 'settings'
}; 