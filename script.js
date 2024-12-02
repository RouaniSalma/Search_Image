
//la clé à l'API
const accessKey = "ukVCPu8IM0zvHMBuA3sTBo-1zCtylKfonwU33A--Nnk";
//declarer les variables qui ref les id des elts
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showmoreBtn = document.getElementById("show-more-btn");


let keyword = "";
//tu commences par récupérer les premiers résultats disponibles de la recherche
let page = 1;

async function searchImages(params) {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
    const response = await fetch(url);
    const data = await response.json();
// si c'est une nouvelle recherche on supprime de resultat existant
    if(page === 1){
        searchResult.innerHTML = "";
       
    }

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        //to add the image to its container which is the div elt
        searchResult.appendChild(imagelink);
    })
    //when we finish displaying all images we display that button
    showmoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    // l'événement de soumission du formulaire c'est e, on evite le comportement par defaut de cet evenement qui est le rechargement de  la page
    e.preventDefault();
     page = 1;
     searchImages();
})

showmoreBtn.addEventListener("click", () =>{
    page++;
    searchImages();
})