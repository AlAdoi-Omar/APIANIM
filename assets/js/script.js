const api_url = "https://api.jikan.moe/v4"
 const  searchText =document.getElementById("searchText");
 const serachResult = document.getElementById("serachResult");
 searchText.addEventListener("keyup",function(){
    if(this.value.length > 3){
        getAnimes(this.value);
    }
 })
 async function getAnimes(query) {
    const res =await fetch(`${api_url}/anime?q=${query}`);
    const animes =await res.json()

    if(animes.data.length > 0) {
    serachResult.style.display = 'block';
     serachResult.innerHTML = ``;
    animes.data.map(anime => {
        serachResult.innerHTML+=`<li class="oneAnime" data-image="${anime.images.jpg.image_url}">
        <a href="${anime.url}" target="_blank"> 
        ${anime.title}</li>`
    })
   const oneAnimes =Array.from(document.querySelectorAll('.oneAnime'));
   const displayImage =document.querySelector('#displayImage');
   oneAnimes.map(oneAnmie => {

    oneAnmie.addEventListener('mouseenter', function(){
displayImage.style.display = 'block';
displayImage.innerHTML=`<img src="${this.dataset.image}">`
    })
    oneAnmie.addEventListener('mouseleave', function(){
        displayImage.style.display = 'none';
   })


})
}
}
/* ToTv Anami */
const topTvAnmia = document.querySelector('#topTvAnmia');

async function getTopanime() {
    const res = await fetch(`${api_url}/top/anime`);
    const topTvData = await res.json();
   

    topTvData.data.map(topAnmia => {

        const originalText = topAnmia.title;

    
        const maxCharacters = 20;


        const partialText = originalText.substring(0, maxCharacters);

 
        const displayedText = originalText.length > maxCharacters ? `${partialText}...` : partialText;

    
        topTvAnmia.innerHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="item">
                    <div class="thumb">
                        <a href="${topAnmia.url}"><img src="${topAnmia.images.jpg.image_url}" alt=""></a>
                        <span class="price">${topAnmia.score}</span>
                    </div>
                    <div class="down-content">
                        <span class="source">${topAnmia.source}</span>
                        <h4>${displayedText}</h4>
                    </div>
                </div>
            </div>`;
    });
}

getTopanime();

const randomCharacter = document.querySelector('#randomCharacter');

async function getRandomCharacter() {
    const res = await fetch(`${api_url}/random/characters`);
    const randomImage = await res.json();
    console.log(randomImage.data);
        randomCharacter.innerHTML += `
        <img src="${randomImage.data.images.jpg.image_url}" alt="">
        <span class="price">${randomImage.data.favorites}</span>
        <span class="name">${randomImage.data.name}</span>
        `
 
}
getRandomCharacter();   





const mostPlayd = document.querySelector('#mostPlayd');

async function getLastanime() {
    const res = await fetch(`${api_url}/seasons/upcoming`);
    const topanimaSession = await res.json();


    topanimaSession.data.map(item => {
    
        mostPlayd.innerHTML += `
            <div class="col-lg-3 col-md-6">
                <div class="item">
                    <div class="thumb">
                        <a href="${item.url}"><img src="${item.images.jpg.image_url}" alt=""></a>
                        <span class="price">${item.type}</span>
                    </div>
                    <div class="down-content">
                        <span class="category">${item.source}</span>
                        <h4>${item.title.substring(0,20)}</h4>
                    </div>
                </div>
            </div>`;
    });
}
getLastanime();



const topCategories = document.querySelector('#topCategories');

async function getTopCategories() {
    const res = await fetch(`${api_url}/top/reviews`);
    const topanimaCategorie = await res.json();
    console.log(topanimaCategorie.data);

    topanimaCategorie.data.map(elemnt => {
    
        topCategories.innerHTML += `
        <div class="col-lg col-sm-6 col-xs-12">
        <div class="item">
          <h4>"${elemnt.user.username}"</h4>
          <div class="thumb">
             <a href="${elemnt.url}"><img src="${elemnt.user.images.jpg.image_url}" alt=""></a>
          </div>
        </div>
      </div>`;
    });
}
getTopCategories();




