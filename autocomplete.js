const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector(".search-txt");
const sugestBox = searchWrapper.querySelector(".list");
const outputSeg = document.querySelector("#seguidores");
const outputIda = document.querySelector("#idade");
const outputGen = document.querySelector("#genero");
const outputEst = document.querySelector("#estado")
let resp;

let suggestions 

inputBox.onkeyup = (e)=>{
    debounce(() => {
        let userData = e.target.value; //user enetered data
        let emptyArray = [];

        if(userData){
            fazerRequisicao("http://127.0.0.1:3000/personalidades-opcoes?string="+userData,"GET").then((dados) => {
                emptyArray = dados.map((data)=>{
                    // passing return data inside li tag
                    return `<li id=${data.id}>${data.nome}</li>`
                });
                searchWrapper.classList.add("active"); //show autocomplete box
                showSuggestions(emptyArray);
                let allList = sugestBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag c
                    allList[i].setAttribute("onclick", "select(this)");
                }
                if (e.key === 'Escape'){
                searchWrapper.classList.remove("active");
                }
                })
                .catch((erros) => {
                console.log(erros)
        })
        
        }else{
            searchWrapper.classList.remove("active"); //hide autocomplete box
        }
    }, 500)
}


function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    webLink = `http://127.0.0.1:3000/opcao-correta?id=${element.id}`;
    fazerRequisicao(webLink, "GET")
    .then((resposta)=>{
        resp = resposta
        if (!('comparacao' in resp)) {
            outputSeg.innerHTML = `<p class="certo">${resp.personalidade.seguidores}</p>`
            outputIda.innerHTML = `<p class="certo">${resp.personalidade.idade}</p>`
            outputEst.innerHTML = `<img src="${resposta.personalidade.estado}" class="certo" alt="bandeira do estado"></img>`
            if (resposta.personalidade.sexo == 0){
                outputGen.innerHTML =`<img src="imagens/masculino.png" class="certo" alt="imagem masculino"></img>`
            } else {
                outputGen.innerHTML =`<img src="imagens/feminino.png" class="certo" alt="imagem feminino"></img>`
            }
        } else {
            compSeguidores(resposta);
            compIdade(resposta);
            compGenero(resposta);
            compEstado(resposta);
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    searchWrapper.classList.remove("active");
}

function compEstado (resposta) {
    outputEst.innerHTML = `<img src="${resposta.personalidade.estado}" alt="bandeira do estado"></img>`
}

function compGenero (resposta) {
    if (resposta.comparacao.sexo == true) {
        if (resposta.personalidade.sexo == 0){
            outputGen.innerHTML =`<img src="imagens/masculino.png" class="certo" alt="imagem masculino"></img>`
        } else {
            outputGen.innerHTML =`<img src="imagens/feminino.png" class="certo" alt="imagem feminino"></img>`
        }
    } else {
     if (resposta.personalidade.sexo == 0){
                outputGen.innerHTML =`<img src="imagens/masculino.png" alt="imagem masculino"></img>`
            } else {
                outputGen.innerHTML =`<img src="imagens/feminino.png" alt="imagem feminino"></img>`
            }
    }
}

function compSeguidores (resposta) {
    if (resposta.comparacao.seguidores == '>') {
        outputSeg.innerHTML = `<p>${resposta.personalidade.seguidores}⬆</p>`
    } else if (resposta.comparacao.seguidores == '<') {
        outputSeg.innerHTML = `<p>${resposta.personalidade.seguidores}⬇</p>`
    } else {
        outputSeg.innerHTML = `<p class="certo">${resposta.personalidade.seguidores}</p>`
    }
}

function compIdade (resposta) {
    if (resposta.comparacao.idade == '>'){
        outputIda.innerHTML = `<p>${resposta.personalidade.idade}⬆</p>`
    } else if (resposta.comparacao.idade == '<') {
        outputIda.innerHTML = `<p>${resposta.personalidade.idade}⬇</p>`
    } else {
        outputIda.innerHTML = `<p class="certo">${resposta.personalidade.idade}</p>`
    }
} 

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    sugestBox.innerHTML = listData;
}


function debounce(func, timeout = 300){
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => { func(); }, timeout);
  } 
  function saveInput(){
    console.log('Salvando os dados');
  }
  function processChange() { 
    debounce(() => saveInput());
}

