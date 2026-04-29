export function validMail(mail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}

export function showError(element, message) {
  element.textContent = message;
  element.style.display = 'block';
}

export function cleanError(element) {
  element.textContent = '';
  element.style.display = 'none';
}