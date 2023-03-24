const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/sortear-personalidade', (req, res) => { //Sortear personalidade
  res.send({theChosenOne: 3})
})

server.get('/personalidades-opcoes', (req, res) => { //Autocomplete
  const string = req.query.string ?? ""
  const opcoes = [{ 
    "id": 1, 
    "nome": "Samara de Oliveira", 
  },
  { 
    "id": 2, 
    "nome": "Kim Kataguiri", 
  },
  { 
    "id": 3, 
    "nome": "Ricardo Almeida", 
  }]
  res.jsonp(opcoes.filter((personalidade) => {
    return personalidade.nome.toUpperCase().includes(string.toUpperCase())
  }))
})

server.get('/opcao-correta', (req, res) => {
  if(req.query.id == 3) {
    res.jsonp({
      personalidade: { 
        "nome": "Ricardo Almeida",
        "imagem": "https://instagram.fudi5-1.fna.fbcdn.net/v/t51.2885-19/41753640_2752801868078561_2114079449661046784_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fudi5-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=Y_7vdPkKs6EAX8P8_ox&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBW1IDldGAMLX9bkOP2DuRwieMVt6EH742FdW907tqfBg&oe=64178C68&_nc_sid=8fd12b", 
        "sexo": 0,
        "idade": 30, 
        "estado": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAArlBMVEX////JFAkLFMvVZWLIAAD03Nzlp6YAAMmmp+b///wGEcsADst7fdzPFABiFKIAAMYLFcj///kABsoKFsUAAM+xs+RdX9EvOMzg5fPO0ex7gNpmadT/+/3z9vbq7fOlqN2Pk+EmLs3Jyuu2uuY7QsvY2+tudNQAAL+Zm9zS1uu9wedPVMwbIc5ISM4wMc1YXtaHit/r7fh2bdD849xgAJ5FTs9rcNmip+HJye+7p9MQtBQ1AAADv0lEQVR4nO3baVsaMRiF4XS6xMzYJrLIjuAGKlptq7b//48VSkWYk8yCeCkv5/7s+8HnmkmGDKjo1eh9taXYBLEJYhPEJohNEJsgNkFsgtgEsQkq819WnauyySpXq5T4651o4mz9MGGTFUlDNW3MJstsS5m2ZpNnTndMV/WSyLHJoontm+nfH2k2WbADM2uihkWXWflNkmiexBxbNvnPnjxNdAous+KbVE4XE3cFLxTpTZw+W0yYQbELRXoTfb400nWFllnZTVwy6i+NmLotsh/LbhLp8epQo8iFIrtJMjxYHboossxKbuIie5me6tj8R3zJTaLKlUkNmV6BrUdyEzdq4tg4/+6R3ES3PWNmsstNYt3zjJmT3LtHcBO7d+CbM9d5Z7Nym7gbozxRDqb7cc7OI7eJPQ5N7ufcPWKb6O+hQdOrZZ9XS23irGcfnuuqvey7R2gTp2+zZoeZy6zQJnGSfoJd8TvzwU1kExfpemYTdZV1iC+ySVw5NVlNjGnqjHfqMpvYVt50O+NdqcgmupN950z1dqxJVd/ljz+G92OJTfRY5V4nxoSPIQU2cRNToIlqBfdj/ePn560UbqLhwNEv+Fow/vVpOwWb6Pvci2SurwPLbPzt64etFGriRhcFm6hBYO8R18SeZz6uLTGqshtN/AeOgSh1/4oirYkeF71zZk69n4+FNUmGJYqowH4sq0lcCx44+j3UxDfRV+WSTPdj4U1cpIMHjgFm7DlIkdSkmn3g6I8ywXfqkppEJfbhhUu8eyQ10Uflkyh1D/uxnCYuaayTRJ3BiiKoiT3OPyJARrVrTmoTm3/g6NdLP7iJaRLbAgeOfo9aaBM9KPp5OM2Ym0RikziO11lM5k3SrwWFNJn90mDt60SZQyuviUuu175MZoPNkXPCmjhnL9YtMq9ya8U1sQ8vSTLVXf61oIgmie3n/9vZ6jaR1ST9S4N1NEQ1cfHE+6XPclrP376Q0MRerr/pPDHqYbHMCmgyujeb0NeCmtjmi6+Sf1fKWMtp4qJkIyaxnCazDzsbIWiN3Tg2YRM2YRM2YRPAJohNEJsgNkFsgtgEsQlS+tXUtvb79nuv58+X7bSJozUiIiIiIiIiIiIiIiIiIiIiIiIiIiIiItoBHylNvfWPZd4h9dY/qnqH2ASxCWITxCaITRCbIDZBbILYBLEJYhPEJohNEJsgNkFsgtgEsQliE8QmiE0QmyA2QWyC2ASxCWITxCaITRCbIDZBbILYBLEJYhPEJohNEJsgNkFsgtgEsQliE/QXgGLDFR3z+TIAAAAASUVORK5CYII=",
        "seguidores": 4500,
        "casa": 3
      }
    })
  } else {
    res.jsonp({
      personalidade: { 
        "nome": "Samara de Oliveira", 
        "sexo": 1,
        "idade": 25, 
        "estado": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bandeira_de_Minas_Gerais.svg/1280px-Bandeira_de_Minas_Gerais.svg.png",
        "seguidores": 1000,
        "casa": 1
      },
      comparacao: {
        sexo: false,
        idade: '>',
        estado: false,
        seguidores: '>',
        casa: false
      }
    })
  }
  
})


server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// Use default router
// server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})