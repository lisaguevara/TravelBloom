function getRecommendation(e){
    e.preventDefault();

    let url = "./travel_recommendation_api.json";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Pull input search text and normalize/validate
        // Compare input text with object names
        // If text contains object name, show obj contents
            // If not, say sorry try again

    })
    .catch(er => {
        console.log(er => console.log("Fetch Error: " + er));
    });
}

const searchForm = document.getElementById('search');
searchForm.addEventListener("submit", getRecommendation);


