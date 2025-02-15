function getRecommendation(e){
    e.preventDefault();
    const emptySearchMsg = "Empty...bad job!";

    let url = "./travel_recommendation_api.json";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
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
            console.log("Getting warmer");
            searchResults.forEach((item, i, arr) => {
                console.log(data[item]);
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


