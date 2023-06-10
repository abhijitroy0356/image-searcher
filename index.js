const API_ACCESS_KEY="0xMQU02c_UBjXzejhZdyABsK7kMBxPGlpe8pf7mpC4Y"

const inputSection=document.getElementById('search-img')
const formEl=document.querySelector("form")
const searches=document.querySelector(".search-results");
const showMore=document.getElementById(".show-more-btn")
const btnSearch=document.getElementById("btn")


let inputData=""
let page=1;

async function searchImages(){
    inputData=inputSection.value;
    // dynamic varible
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_ACCESS_KEY}`;

    const response= await fetch(url)
    const data=await response.json()

    const results=data.results

    if(page===1){
        searches.innerHTML=""
    }
    results.map((result)=>{
        const imageWrapper=document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image=document.createElement('img')
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searches.appendChild(imageWrapper);
    });

    page++;
    if(page>1){
        showMore.style.display="block"
    }
}
formEl.addEventListener("submit",(event)=>{
    event.preventDefault(); //without this instant refersh happens
    page=1;
    searchImages();
})
showMore.addEventListener("click",function(){
    searchImages();
})