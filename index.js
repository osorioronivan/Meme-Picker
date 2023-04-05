
import catsData from "./data.js" 
const emotionRadios = document.getElementById("emotion-radios")
const btnGetImage = document.getElementById('btn-get-image')
 const modal = document.getElementById("meme-modal")
 const innerModal = document.getElementById("meme-inner-modal")
const btnCloseModal = document.getElementById("btn-meme-modal-close")
function getEmotionsArray(cats){
    const emotionsArr = []
    for (let cat of cats){
        for (let emotions of cat.emotionTags){
            if (emotionsArr.includes(emotions) === false){
                emotionsArr.push(emotions)
            }
        }
    }
    return emotionsArr
}
const renderEmotionsRadios=(cats)=>{
    const emotions = getEmotionsArray(cats)
    let radiosHtml = ""
    for (let emotion of emotions){
            radiosHtml += `
                <div class="radio-Container">
                    <label for ${emotion}>${emotion}</label>
                    <input type = "Radio" 
                        id= ${emotion}
                        name= "emotions"
                        value="${emotion}">
                </div>`
        
    }
    return radiosHtml
}
emotionRadios.innerHTML =  renderEmotionsRadios(catsData)

emotionRadios.addEventListener('change', highlightCheckedOption)
function highlightCheckedOption(e)
{
    let radioContainerArr =  document.getElementsByClassName('radio-Container')
    for (let element of radioContainerArr){
        element.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

 btnGetImage.addEventListener("click", renderCat)
 function renderCat(){
    const cat = getSingleCatObject()
    innerModal.innerHTML = `<img src="images/${cat.image}" class = "cat-img" alt="${cat.alt}">`
    modal.style.display = "flex"
 }
 function getSingleCatObject(){
   const catsArray = getMatchingCatsArray()
   if (catsArray.length === 1 ){
    return catsArray[0]
   }
   else{
    const randomNum = Math.floor(Math.random() * catsArray.length )
    
    return catsArray[randomNum]
   }
 }
 function getMatchingCatsArray(){
    const checkedRadio = document.querySelector('input[type="radio"]:checked')
  
    if (checkedRadio){
        const isGif = document.getElementById('gifs-only-option').checked
        const matchCatsArray = catsData.filter((cat)=>{
            if(isGif){
                return cat.emotionTags.includes(checkedRadio.value) && cat.isGif
            }else{
                return cat.emotionTags.includes(checkedRadio.value)
            }
        })
        return matchCatsArray
    }
 }
 btnCloseModal.addEventListener("click",()=>modal.style.display="none")


