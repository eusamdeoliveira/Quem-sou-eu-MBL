const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const db = require('./db')

server.use(middlewares)

server.get('/sortear-personalidade', (req, res) => { //Sortear personalidade
  // const theChosenOne = Math.floor(Math.random() * db.length)
  //Estudar como a requisição vai tratar múltiplos sorteios de personalidade
    // pegar o IP da pessoa
      // Verificar pelo IP as personalidades sorteadas
      // remover os 3 últimos sorteios (se houver)
      // ordenar a frequência das personalidades sorteadas
      // sortear entre os menos frequentes
    // Criar Token jwt
      // Colocar o theChosenOne dentro do payload, junto com o IP e a data do sorteio
  const theChosenOne = 3
  res.send({theChosenOne})
})

server.get('/personalidades-opcoes', (req, res) => { //Autocomplete
  const string = req.query.string ?? ""
  res.json(
    db
      .filter(personalidade => personalidade.nome.toUpperCase().includes(string.toUpperCase()))
      .map(personalidade => ({nome: personalidade.nome, id: personalidade.id}))
  )
})

server.get('/opcao-correta', (req, res) => {
  const id = Number(req.query.id)
  if(!id) return res.status(404).send('ID inválido')
  const theChosenOne = 3 // Depois será pego pelo payload do token da própria requisição
  const personalidade = db.find(per => per.id === id)

  if(id === theChosenOne) {
    res.status(200).json({personalidade})
  } else {
    delete personalidade['imagem']
    const personalidadeSorteada = db.find(p => p.id === theChosenOne)
    res.status(200).json({
      personalidade,
      comparacao: {
        sexo: personalidadeSorteada.sexo === personalidade.sexo,
        estado: personalidadeSorteada.estado === personalidade.estado,
        casa: personalidadeSorteada.casa === personalidade.casa,
        idade: personalidadeSorteada.idade === personalidade.idade ? '=' : 
          personalidadeSorteada.idade < personalidade.idade ? '<' : '>',
        seguidores: personalidadeSorteada.seguidores === personalidade.seguidores ? '=' : 
          personalidadeSorteada.seguidores > personalidade.seguidores ? '>' : '<',
      }
    })
  }
})

server.listen(3000, () => {
  console.log('JSON Server is running')
})