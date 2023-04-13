let theChosenOne
(async () => { 
   /*  "/personalidade-escolhida", */
      theChosenOne = (await fazerRequisicao ("/sortear-personalidade", "GET")).theChosenOne
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