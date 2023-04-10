// A cada 1000 unidades, dividir por 1000 e adicionar uma letra.
const maxTentativas = 3
let tentativas = 0

const unitMapper = {
  0: "",
  1: "K",
  2: "M",
  3: "B"
};

function unitTransform(numero, unidade) {
  return numero < 1000
    ? numero + unitMapper[unidade]
    : unitTransform(Math.round(numero / 1000), unidade + 1);
}

function buildLinha (nome, casa, genero, estado, seguidores, idade, imagem) {
  acerto(nome.certo, imagem)
  return `
  <div class="res">
    <p class="chutePersona">${nome.chute}</p>
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
        <p ${seguidores.certo==true?'class="certo"':""}>${unitTransform(seguidores.quantidade, 0)}${seguidores.certo == ">" ? "⬆" : seguidores.certo == "<" ? "⬇" : ""}</p>
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

function newGame (){
  window.location.reload(true)
}

function acerto(chute, imagem) {
  const searchWrapper = document.querySelector(".search-box");

  tentativas++
  console.log(tentativas)
  document.querySelector('.search-box').innerHTML = `<input type="text" class="search-txt" placeholder="selecione um MBL -> ${tentativas}/${maxTentativas}" onkeyup="inputBoxOnkeyup(event)">
  <div class="list"></div>`
  if (chute == true) {
    document.querySelector("#acerto").innerHTML = "<p>Parabéns, você acertou! 🎉</p>"
    document.querySelector(".imagem").innerHTML = `<img id="pessoa" src=${imagem} alt="chute"></img>`
    searchWrapper.innerHTML = `<button id="reload" onclick="newGame()">↺ NOVO JOGO</button>`
  }else if (tentativas >= maxTentativas ) {
    document.querySelector("#acerto").innerHTML = "<p>FIM DE JOGO</p>"
    document.querySelector(".imagem").innerHTML = `<img id="pessoa" src=${imagem} alt="chute"></img>`
    searchWrapper.innerHTML = `<button id="reload" onclick="newGame()">↺ NOVO JOGO</button>`
  }  
}



function buildTentativa(resposta) {
  document.querySelector(".output").innerHTML += buildLinha(
    {
      chute: resposta.personalidade.nome,
      certo: !resposta.comparacao ? true : false,
    },
    {
      numero: resposta.personalidade.casa,
      certo: !resposta.comparacao ? true : resposta.comparacao.casa,
    },
    {
      numero: resposta.personalidade.sexo,
      certo: !resposta.comparacao ? true : resposta.comparacao.sexo == true ? true : false,
    },
    {
      imagem: resposta.personalidade.estado,
      certo: !resposta.comparacao ? true : resposta.comparacao.estado == true ? true : false,
    },
    {
      quantidade: resposta.personalidade.seguidores,
      certo: !resposta.comparacao ? true : resposta.comparacao.seguidores == '=' ? true : resposta.comparacao.seguidores,
    },
    {
      anos: resposta.personalidade.idade,
      certo: !resposta.comparacao ? true : resposta.comparacao.idade == '=' ? true : resposta.comparacao.idade,
    },
    resposta.personalidade.imagem
  );    
} 