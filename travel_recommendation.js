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
    const resultsElem = document.getElementById("searchResults");
    resultsElem.classList.remove("hide");
    resultsElem.classList.add("show");
    let divElem = document.createElement("div");
    divElem.id = result.id;
    divElem.classList.add("result");

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

    resultsElem.append(divElem);
}

function getRecommendation(e){
    e.preventDefault();
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
            console.log("ice cold...");
        }

    })
    .catch(er => {
        console.log("Fetch Error: " + er);
    });
}

const searchForm = document.getElementById('search');
searchForm.addEventListener("submit", getRecommendation);


