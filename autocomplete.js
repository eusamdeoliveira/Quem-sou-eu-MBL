const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector(".search-txt");
const sugestBox = searchWrapper.querySelector(".list");
const outputSeg = document.querySelector("#seguidores");
const outputIda = document.querySelector("#idade");
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
        } else if (resp.comparacao.seguidores == '>') {
            outputSeg.innerHTML = `<p>${resp.personalidade.seguidores}⬆</p>`
            outputIda.innerHTML = `<p>${resp.personalidade.idade}⬆</p>`
        } else if (resp.comparacao.seguidores == '<') {
            outputSeg.innerHTML = `<p>${resp.personalidade.seguidores}⬇</p>`
            outputIda.innerHTML = `<p>${resp.personalidade.idade}⬇</p>`
        } else {
            outputSeg.innerHTML = `<p class="certo">${resp.personalidade.seguidores}</p>`
            outputIda.innerHTML = `<p class="certo">${resp.personalidade.idade}</p>`
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    console.log(!list.length);
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
  const processChange = debounce(() => saveInput());

