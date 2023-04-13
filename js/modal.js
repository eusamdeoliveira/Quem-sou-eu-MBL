const button = document.querySelector("#myBtn");
const modal = document.querySelector("dialog");
const buttonClose = document.querySelector("#fecharModal")
const modalBody = document.querySelector("#modal-container")

const windowListener = function(e) {
  console.log(e)
  const lugarDoClick = e.target
  if (!modalBody.contains(lugarDoClick)){
    fecharModal()
  }
}

button.onclick = (e) => {
  abrirModal()
}

buttonClose.onclick = (event) => {
  fecharModal()
}

function abrirModal () {
  modal.showModal()
  setTimeout(() => {window.addEventListener('click', windowListener, false)}, 0)
}

function fecharModal () {
  modal.close()
  window.removeEventListener('click', windowListener, false)
}