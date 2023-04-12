const button = document.querySelector("#myBtn");
const modal = document.querySelector("dialog");
const buttonClose = document.querySelector("#fecharModal")

function abrirModal () {
  modal.showModal()
}

function fecharModal () {
  modal.close()
}