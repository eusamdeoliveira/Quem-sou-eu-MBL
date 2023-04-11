const casaMapper = {
    1: "imagens/espartadisable.jpg",
    2: "imagens/atenasdisable.jpg",
    3: "imagens/alexandriadisable.jpg",
}

let currentSuggestionFocusIndex = 0

const getHtmlList = () => document.querySelector(".search-box").querySelector(".list").querySelectorAll("li")

function handleArrow(isUp) {
  const htmlList = getHtmlList()
  if(htmlList.length === 0) return
  
  if(currentSuggestionFocusIndex < htmlList.length) htmlList[currentSuggestionFocusIndex].classList.remove("liact")
  if(isUp && currentSuggestionFocusIndex > 0) {
    currentSuggestionFocusIndex--
  } else if(!isUp && currentSuggestionFocusIndex < htmlList.length - 1) {
    currentSuggestionFocusIndex++
  }

  htmlList[currentSuggestionFocusIndex].classList.add("liact")
}

const inputBoxOnkeyup = (e)=>{
  const searchWrapper = document.querySelector(".search-box");
  const sugestBox = searchWrapper.querySelector(".list");
  e.preventDefault()

  if(e.key === "ArrowDown" || e.key === "ArrowUp") {
    return handleArrow(e.key === "ArrowUp")
  }

  if(e.key === "Enter") {
    return sugestBox.querySelectorAll("li")[currentSuggestionFocusIndex].click()
  }

  debounce(() => {
    let userData = e.target.value;
    if(userData) {
      fazerRequisicao("http://127.0.0.1:3000/personalidades-opcoes?string=" + userData, "GET")
        .then((dados) => {
          showSuggestions(dados.map((data) => `<li id=${data.id}>${data.nome}</li>`));
          if(dados.length === 0) return
          let allList = sugestBox.querySelectorAll("li");
          for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
            allList[i].setAttribute("onmouseenter", `getHtmlList()[currentSuggestionFocusIndex].classList.remove('liact'); this.classList.add('liact'); currentSuggestionFocusIndex = ${i};`);
            allList[i].setAttribute("onmouseleave", `this.classList.remove('liact'); currentSuggestionFocusIndex = ${i};`);
          }
          sugestBox.setAttribute('onmouseleave', `getHtmlList()[currentSuggestionFocusIndex].classList.add('liact')`)
          getHtmlList()[currentSuggestionFocusIndex].classList.add("liact")
          // if (e.key === 'Escape') {
          //   sugestBox.innerHTML = ""
          // }
        })
        .catch((erros) => {console.log(erros)})
    } else {
      sugestBox.innerHTML = ""
    }
  }, 500)
}


function select(element) {
  const searchWrapper = document.querySelector(".search-box");
  const sugestBox = searchWrapper.querySelector(".list");
  const inputBox = searchWrapper.querySelector(".search-txt");

  inputBox.value = "";
  webLink = `http://127.0.0.1:3000/opcao-correta?id=${element.id}&tco=${theChosenOne}`;
  fazerRequisicao(webLink, "GET")
    .then(buildTentativa)
    .catch((err)=>{console.log(err)})
  sugestBox.innerHTML = ""
}

function showSuggestions(list) {
  const searchWrapper = document.querySelector(".search-box");
  const sugestBox = searchWrapper.querySelector(".list");

  const listData = list.length ? list.join('') : `<li style="cursor: not-allowed;">Nenhuma Sugestão</li>`;
  sugestBox.innerHTML = listData;
}