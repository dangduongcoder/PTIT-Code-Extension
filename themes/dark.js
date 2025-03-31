// Dark Theme JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Thêm class dark-theme vào body
  document.body.classList.add('dark-theme');
  
  // Thêm hiệu ứng hover cho các button
  const buttons = document.querySelectorAll('button, .button');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = '#555555';
    });
    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = '#444444';
    });
  });
}); 