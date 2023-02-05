import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
let position=search.search('=');
return search.slice(position+1);

  // Place holder for functionality to work in the Stubs
 // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url=config.backendEndpoint+"/adventures/detail?adventure="+adventureId;
  try{
    let temp=await fetch(url)
    .then(res => res.json());
    return temp;
  }
catch(err){
  return null;
}

  // Place holder for functionality to work in the Stubs
 // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
let head=document.getElementById("adventure-name");
head.innerHTML=adventure.name;
let subhead=document.getElementById("adventure-subtitle");
subhead.innerHTML=adventure.subtitle;
let gallery=document.getElementById("photo-gallery");
for(let i=0;i<adventure.images.length;i++){
  let div=document.createElement("div");
  let image=document.createElement("img");
  if(i==0) image.setAttribute("id","img_1");
  image.setAttribute("src",adventure.images[i]);
  image.setAttribute("class","activity-card-image");
  div.appendChild(image);
  gallery.appendChild(div);

}
var temp=document.getElementById("adventure-content");
temp.innerHTML=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let img=document.getElementById("photo-gallery")
  img.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="put-img">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `

  let putImg=document.getElementById("put-img")
  for(let i=0;i<images.length;i++){
    if(i==0){
      putImg.innerHTML+=`
      <div class="carousel-item active">
        <img src="${images[i]}" class="d-block w-100 activity-card-image" alt="...">
      </div>
      `
    } else {
      putImg.innerHTML+=`
      <div class="carousel-item">
        <img src="${images[i]}" class="d-block w-100 activity-card-image" alt="...">
      </div>
      `
    }
    
  }
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    let cost = document.getElementById("reservation-person-cost");
    cost.innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
/* let total=adventure.costPerHead*persons;
console.log(total); */
document.getElementById("reservation-cost").innerHTML=adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.getElementById("myForm")

  form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    let url=config.backendEndpoint+"/reservations/new"

    let formData=form.elements

    let data=JSON.stringify({
      name: formData["name"].value,
      date: formData["date"].value,
      person: formData["person"].value,
      adventure: adventure.id
    })

    try{
      let res=await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(res.ok){
        alert("Success!")
      } else {
        alert("Failed!")
      }
    } catch(err) {
      console.log(err);
      alert("Failed!")
    }
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block";
}
else{
  document.getElementById("reserved-banner").style.display="none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
