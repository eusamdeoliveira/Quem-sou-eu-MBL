// A cada 1000 unidades, dividir por 1000 e adicionar uma letra.

const unitMapper = {
  0: "",
  1: "K",
  2: "M",
  3: "B"
};

function coisa(numero, unidade) {
  return numero < 1000
    ? numero + unitMapper[unidade]
    : coisa(Math.round(numero / 1000), unidade + 1);
}

function buildLinha (nome, casa, genero, estado, seguidores, idade, imagem) {
  acerto(nome.certo, imagem)
  return `
  <div class="res">
    <p id="chutePersona">${nome.chute}</p>
    <div id="outimg">
      <div id="casa">
        <img src="${casaMapper[casa.numero]}" ${casa.certo[0]==true?'class="certo"':""} alt="imagem casa"></img>
      </div>
      <div id="genero">
        <img src="imagens/${genero.numero==0?"masculino":"feminino"}.png" ${genero.certo==true?'class="certo"':""} alt="imagem feminino"></img>
      </div>
      <div id="estado">
        <img src="${estado.imagem}" ${estado.certo==true?'class="certo"':""} alt="imagem estado"></img>
      </div>
      <div id="seguidores">
        <p ${seguidores.certo==true?'class="certo"':""}>${coisa(seguidores.quantidade, 0)}${seguidores.certo == ">" ? "⬆" : seguidores.certo == "<" ? "⬇" : ""}</p>
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

function acerto(chute, imagem) {
  chute == true ?
  [document.querySelector("#acerto").innerHTML = "<p>Parabéns, você acertou! 🎉</p>",
  document.querySelector(".imagem").innerHTML = `<img id="pessoa" src=${imagem} alt="chute"></img>`] : 
  document.querySelector(".imagem").innerHTML = `<img id="pessoa" src="imagens/avatar.webp" alt="chute"></img>`
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