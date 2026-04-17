export function validMail(mail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}

export function showError(element, message) {
  element.textContent = message;
}

export function cleanError(element) {
  element.textContent = '';
}