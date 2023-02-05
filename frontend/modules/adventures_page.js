import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response = await fetch(config.backendEndpoint+"/adventures?city="+city);
    let data= await response.json();
    return data;
  } catch(err){
    return null
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((data)=>{
    let { id, category, image , name, costPerHead, duration } = data
   
    let cards=document.getElementById("data");
    cards.innerHTML+=`
    <div class="col-6 col-lg-3 mb-3">
      <a id=${id} href="/pages/adventures/detail/index.html?adventure=${id}">
        <div style="height: 20rem;" class="card adventure-card">
        <p class="category-banner">${category}</p>
          <img style="height: 13rem;" src="${image}" class="card-img-top" alt="..." />
         
          <div style="padding: .2rem" class="card-body  text-center d-md-flex justify-content-between">
            <p style="margin: 0;" class="card-title">${name}</p>
            <p style="margin: 0;" class="card-text">₹${costPerHead}</p>
          </div>
          <div style="padding: .2rem" class="card-body  text-center d-md-flex justify-content-between">
            <p style="margin: 0;" class="card-title">Duration</p>
            <p style="margin: 0;" class="card-text">${duration} Hours</p>
          </div>
        </div>
      </a>
    </div>
    `
   
    })
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list=list.filter(item=>(item.duration>=low && item.duration<=high));
  return list;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log(categoryList);
  let newarr=[];
  if(categoryList){
    for(let i=0;i<list.length;i++){
      for(let j=0;j<categoryList.length;j++){
        if(list[i].category==categoryList[j])
        newarr.push(list[i]);
      }
    }
    console.log(newarr);
  }  
  return newarr;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filterArray = filterByCategory(list,filters["category"]);
  if(filterArray.length==0){
    filterArray=list
  }


  if(filters["duration"]){
    let [low,high]=filters["duration"].split("-")
    filterArray=filterByDuration(list,low,high)
  }
  //console.log(filterArray);

  



  // Place holder for functionality to work in the Stubs
  return filterArray;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  filters=JSON.stringify(filters);
  window.localStorage.setItem("filters",filters);

  //return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
let data=window.localStorage.getItem("filters");
data=JSON.parse(data);

  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
 // console.log(filters["category"]);
  let temp=document.getElementById("category-list");
  filters["category"].forEach((category)=>

  temp.innerHTML+=`
  
  <p class="category-filter">${category}</p>`)

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
