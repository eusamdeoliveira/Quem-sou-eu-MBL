const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector(".search-txt");
const sugestBox = searchWrapper.querySelector(".list");
const output = document.querySelector(".output");
let outputSeg;
let outputIda;
let outputGen;
let outputEst;
let outputCas;
let resp;
const casaMapper = {
    1: "imagens/espartadisable.jpg",
    2: "imagens/atenasdisable.jpg",
    3: "imagens/alexandriadisable.jpg",
}

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
        resp = resposta;
        document.querySelector(".output").innerHTML += buildLinha(resposta.personalidade.nome,{
            numero: resposta.personalidade.casa,
            certo: resposta.comparacao ? resposta.comparacao.casa : true,
        },{
            numero: resposta.personalidade.sexo,
            certo: !resposta.comparacao ? true : resposta.comparacao.sexo == true ? true : false,
        },{
            imagem: resposta.personalidade.estado,
            certo: !resposta.comparacao ? true : resposta.comparacao.estado == true ? true : false,
        },{
            quantidade: resposta.personalidade.seguidores,
            certo: !resposta.comparacao ? true : resposta.comparacao.seguidores == '=' ? true : resposta.comparacao.seguidores,
        },{
            anos: resposta.personalidade.idade,
            certo: !resposta.comparacao ? true : resposta.comparacao.idade == '=' ? true : resposta.comparacao.idade,
        });
    })
    .catch((err)=>{
        console.log(err)
    })
    searchWrapper.classList.remove("active");
}

function buildLinha (nome, casa, genero, estado, seguidores, idade) {
    return `
    <div class="res">
        <p class="chutePersona"> ${nome}</p>
        <div id="outimg">
            <div id="casa">
            <img src="${casaMapper[casa.numero]}" ${casa.certo==true?'class="certo"':""} alt="imagem casa"></img>
            </div>
            <div id="genero">
            <img src="imagens/${genero.numero==0?"masculino":"feminino"}.png" ${genero.certo==true?'class="certo"':""} alt="imagem feminino"></img>
            </div>
            <div id="estado">
            <img src="${estado.imagem}" ${estado.certo==true?'class="certo"':""} alt="imagem estado"></img>
            </div>
            <div id="seguidores">
            <p ${seguidores.certo==true?'class="certo"':""}>${seguidores.quantidade}${seguidores.certo == ">" ? "⬆" : seguidores.certo == "<" ? "⬇" : ""}</p>
            </div>
            <div id="idade">
            <p ${idade.certo==true?'class="certo"':""}>${idade.anos}${idade.certo == ">" ? "⬆" : idade.certo == "<" ? "⬇" : ""}</p>
            </div>

        </div>
        <div id="outtxt">
            <p>casa</p>
            <p>gênero</p>
            <p>estado</p>
            <p>seguidores</p>
            <p>idade</p>
        </div>
    </div>
`
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

