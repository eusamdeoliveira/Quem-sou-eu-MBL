const button = document.querySelector("#myBtn");
const modal = document.querySelector("dialog");
const buttonClose = document.querySelector("#fecharModal")
const modalBody = document.querySelector("#modal-container")

button.onclick = (e) => {
  abrirModal()
}

buttonClose.onclick = (e) => {
  fecharModal()
}

function abrirModal () {
  modal.showModal()
}

function fecharModal () {
  modal.close()
}

window.addEventListener('click', function(e) {
  if(button.contains(e.target)) return
  if (modal.hasAttribute('open') && !modalBody.contains(e.target)){
    fecharModal()
  }
});