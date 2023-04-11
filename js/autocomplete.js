const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector(".search-txt");
const sugestBox = searchWrapper.querySelector(".list");
const casaMapper = {
    1: "imagens/espartadisable.jpg",
    2: "imagens/atenasdisable.jpg",
    3: "imagens/alexandriadisable.jpg",
}

let suggestions 

inputBox.onkeyup = (e)=>{
  debounce(() => {
    let userData = e.target.value;

    if(userData) {
      fazerRequisicao("http://127.0.0.1:3000/personalidades-opcoes?string=" + userData, "GET")
        .then((dados) => {
          showSuggestions(dados.map((data) => `<li id=${data.id}>${data.nome}</li>`));
          let allList = sugestBox.querySelectorAll("li");
          for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
          }
           if (e.key === 'Escape') {
             sugestBox.innerHTML = ""
           }
        })
        .catch((erros) => {console.log(erros)})
    } else {
      sugestBox.innerHTML = ""
    }
  }, 500)
}


function select(element){
    inputBox.value = "";
    webLink = `http://127.0.0.1:3000/opcao-correta?id=${element.id}&tco=${theChosenOne}`;
    fazerRequisicao(webLink, "GET")
      .then(buildTentativa)
      .catch((err)=>{console.log(err)})
    sugestBox.innerHTML = ""
}

function showSuggestions(list){
    let listData;
    if(!list.length) {
      userValue = inputBox.value;
      listData = `<li>${userValue}</li>`;
    } else {
      listData = list.join('');
    }
    sugestBox.innerHTML = listData;
}