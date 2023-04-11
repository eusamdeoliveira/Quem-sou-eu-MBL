const modal = document.querySelector('dialog')
const openModalButton = document.querySelector('#openModalButton')

openModalButton.onclick = () => {
  modal.showModal()
}

window.addEventListener('click', (e) => {
  if(modal.contains(e.target)) {
    modal.close()
  }
})