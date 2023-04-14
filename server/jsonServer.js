// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const middlewares = jsonServer.defaults()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.get('/sortear-personalidade', (req, res) => { //Sortear personalidade
  const theChosenOne = Math.ceil(Math.random() * db.length)
  res.send({theChosenOne})
})

app.get('/personalidades-opcoes', (req, res) => { //Autocomplete
  const string = req.query.string ?? ""
  res.json(
    db
      .filter(personalidade => personalidade.nome.toUpperCase().includes(string.toUpperCase()))
      .map(personalidade => ({nome: personalidade.nome, id: personalidade.id}))
  )
})

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

app.get('/opcao-correta', (req, res) => {
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
        seguidores: unitTransform(personalidadeSorteada.seguidores, 0) === unitTransform(personalidade.seguidores, 0) ? '=' : 
          personalidadeSorteada.seguidores > personalidade.seguidores ? '>' : '<',
      }
    })
  }
})

app.listen(3000, () => {
  console.log('Server is running')
})