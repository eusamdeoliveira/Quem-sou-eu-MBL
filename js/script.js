let theChosenOne
(async () => { 
   /*  "http://127.0.0.1:3000/personalidade-escolhida", */
      theChosenOne = (await fazerRequisicao ("http://127.0.0.1:3000/sortear-personalidade", "GET")).theChosenOne
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

window.onload = function () { 
    window.onscroll = function () { 
      var doc = document.body, 
      scrollPosition = doc.scrollTop,
      pageSize = (doc.scrollHeight - doc.clientHeight),
      percentageScrolled = Math.floor((scrollPosition / pageSize) * 100); 
  
       if (percentageScrolled >= 50){ // if the percentage is >= 50, scroll to top
         window.scrollTo(0,70); 
       } 
     }; 
  };