function getRecommendation(e){
    e.preventDefault();
    const emptySearchMsg = "Empty...bad job!";

    let url = "./travel_recommendation_api.json";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let dataResults = []
        for (var dataObj in data){
            dataResults.push(dataObj);
        }
        console.log(dataResults);

        // Pull input search text and normalize/validate
        // Ideally, I'd also remove any html in the search text here...
        let searchTextRaw = document.querySelector('form#search input').value.trim();
        let searchText = (searchTextRaw && searchTextRaw != "") ? searchTextRaw.toLowerCase() : emptySearchMsg;

        // Compare input text with object names
        let isSearchTxtInResults = (dataResults.indexOf(searchText) != -1); 
        /* This looks for EXACT searches only, but the text should still result in positive search
        if the object key CONTAINS the search text...
        */

        // If text contains object name, show obj contents
        // If not, say sorry try again
        if (isSearchTxtInResults) {
            console.log("Getting warmer");
        } else {
            console.log("ice cold...");
        }

    })
    .catch(er => {
        console.log("Fetch Error: " + er);
    });
}

const searchForm = document.getElementById('search');
searchForm.addEventListener("submit", getRecommendation);


