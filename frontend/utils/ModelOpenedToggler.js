let scrollPosition = 0;

export function openModal() {
  // 1. Get current scroll position
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  // 2. Add the locked class and set body to fixed with the negative offset
  document.body.classList.add('modal-open');  
  // Show your modal here...
}

export function closeModal() {
  // 1. Remove the locked class and reset body top
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  
  // 2. Restore the previous scroll position
  window.scrollTo(0, scrollPosition);
  
  // Hide your modal here...
}