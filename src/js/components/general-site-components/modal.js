let modalContainer = '';

export function openModal (e){
  e.preventDefault();
  modalContainer.classList.add('active');
}

export function closeModal (e){
  e.preventDefault();
  modalContainer.classList.remove('active');
}

function outside(e) {
  if (e.target === this) {
    e.preventDefault();
    modalContainer.classList.toggle('active');
  }
}

export function initModal(open, container, close) {
  modalContainer = container;
  if (open && close && container) {
    open.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    container.addEventListener('click', outside);
    open.addEventListener('touchstart', openModal);
    close.addEventListener('touchstart', closeModal);
    container.addEventListener('touchstart', outside);
  }
}

export function initModalMenuDropdown (open, container, close, closeMenu){
  modalContainer = container;
  if (open && close && container && closeMenu) {
    open.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    container.addEventListener('click', outside);
    closeMenu.addEventListener('click', outside);
    open.addEventListener('touchstart', openModal);
    close.addEventListener('touchstart', closeModal);
    container.addEventListener('touchstart', outside);
  }
}

export function closeModalAutomatically(modalClose, container) {
  modalContainer = container;
  const event = new Event('click');
  modalClose.addEventListener('click', closeModal, false);
  modalClose.addEventListener('touchstart', closeModal, false);
  modalClose.dispatchEvent(event);
}
