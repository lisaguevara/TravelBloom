function displayResults(result){
    result.forEach((item, i, arr) => {
         if (item.cities) {
            item.cities.forEach(city => createResultElems(city));
        } else {
            createResultElems(item);
        }  
    });
}

function createResultElems(result){
    const divElem = createAndShowResultContainer();

    let nameElem = document.createElement("p");
    nameElem.classList.add("cityName");
    nameElem.textContent = result.name;
    divElem.append(nameElem);

    let imgElem = document.createElement("img");
    imgElem.classList.add("cityImg");
    imgElem.alt = result.name;
    imgElem.src = result.imageUrl;
    divElem.append(imgElem);

    let descElem = document.createElement("p");
    descElem.classList.add("cityDesc");
    descElem.textContent = result.description;
    divElem.append(descElem);
}

function createAndShowResultContainer(){
    const resultsElem = document.getElementById("searchResults");
    resultsElem.classList.remove("hide");
    resultsElem.classList.add("show");
    let divElem = document.createElement("div");
    divElem.classList.add("result");
    resultsElem.append(divElem);
    return divElem;
}

function removeAndHideResultContainer() {
    const results = document.getElementById("searchResults");
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    results.classList.add("hide");
    results.classList.remove("show");
}

function getRecommendation(e){
    e.preventDefault();
    if (document.getElementById("searchResults").firstChild) {
        removeAndHideResultContainer();
    }
    const emptySearchMsg = "Empty...bad job!";

    let url = "./travel_recommendation_api.json";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // Pull input search text and normalize/validate
        // Ideally, I'd also remove any html in the search text here...
        let searchTextRaw = document.querySelector('form#search input').value.trim();
        let searchText = (searchTextRaw && searchTextRaw != "") ? searchTextRaw.toLowerCase() : emptySearchMsg;
        let tempResults = []
        for (var dataObj in data){
            tempResults.push(dataObj);
        }
        // Compare input text with object names
        let searchResults = tempResults.filter(objName => {return objName.includes(searchText)});
        if (searchResults.length > 0) { // If text contains object name, show obj contents
            searchResults.forEach((item, i, arr) => {
                displayResults(data[item]);
            });
        } else { // If not, say sorry try again
            const resultContainer = createAndShowResultContainer();
            resultContainer.append(document.createTextNode("No matching search results"));
        }

    })
    .catch(er => {
        console.log("Fetch Error: " + er);
    });
}

const searchForm = document.getElementById('search');
searchForm.addEventListener("submit", getRecommendation);

const clearBtn = document.querySelector("#search button[type='reset'");
clearBtn.addEventListener("click", removeAndHideResultContainer);


