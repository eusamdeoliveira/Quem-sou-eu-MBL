(async () => { 
   /*  "http://127.0.0.1:3000/personalidade-escolhida", */
      const pegando = await fazerRequisicao ("http://127.0.0.1:3000/personalidade-escolhida", "GET")
      console.log(pegando)
})()

async function fazerRequisicao (url, método, corpo) {
    return await fetch (
        url,
        {
        method : método,
        body : corpo,
        })
    .then(response => response.json())
}