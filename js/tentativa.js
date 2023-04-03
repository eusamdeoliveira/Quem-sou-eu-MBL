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

function buildTentativa(resposta) {
  document.querySelector(".output").innerHTML += buildLinha(
    resposta.personalidade.nome,
    {
      numero: resposta.personalidade.casa,
      certo: resposta.comparacao ? resposta.comparacao.casa : true,
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
    }
  );
    
} 