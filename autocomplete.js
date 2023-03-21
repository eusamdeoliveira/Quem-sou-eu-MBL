const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector(".search-txt");
const sugestBox = searchWrapper.querySelector(".list");

let suggestions 

inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];

   
    if(userData){
        console.log(emptyArray)
        fazerRequisicao("http://127.0.0.1:3000/personalidades-opcoes?string="+userData,"GET").then((dados) => {
            emptyArray = dados.map((data)=>{
                // passing return data inside li tag
                return `<li style="cursor: pointer;" id=${data.id}>${data.nome}</li>`
            });
            searchWrapper.classList.add("active"); //show autocomplete box
            showSuggestions(emptyArray);
            let allList = sugestBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                //adding onclick attribute in all li tag
                allList[i].setAttribute("onclick", "select(this)");
            }
            if (e.key === 'Escape'){
              searchWrapper.classList.remove("active");
            }
            })
            .catch((erros) => {
            console.log(erros)
       })
       
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    element.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        const linkTag = document.querySelector("#linktag");
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    console.log(!list.length);
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    sugestBox.innerHTML = listData;
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  } 
  function saveInput(){
    console.log('Salvando os dados');
  }
  const processChange = debounce(() => saveInput());
