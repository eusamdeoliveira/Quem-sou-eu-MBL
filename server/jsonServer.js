const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const db = require('./db')

server.use(middlewares)

server.get('/sortear-personalidade', (req, res) => { //Sortear personalidade
  const theChosenOne = Math.ceil(Math.random() * db.length)
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
  const tco = Number(req.query.tco)
  if(!id) return res.status(404).send('ID inválido')
  const personalidade = db.find(per => per.id === id)

  if(id === tco) {
    res.status(200).json({personalidade})
  } else {
    const personalidadeSorteada = db.find(p => p.id === tco)
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