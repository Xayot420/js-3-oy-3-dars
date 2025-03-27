function guessNationality() {
    let name = document.getElementById("nameInput").value;
    let resultDiv = document.getElementById("result");
    let flagsDiv = document.getElementById("flags");

    if (name === "") {
        resultDiv.innerText = "Please enter a name.";
        flagsDiv.innerHTML = "";
        return;
    }

    fetch(`https://api.nationalize.io?name=${name}`)
        .then(response => response.json())
        .then(data => {  
            if (data.country.length > 0) {
                resultDiv.innerText = "Possible nationalities:";
                flagsDiv.innerHTML = "";
                
                data.country.forEach(country => {
                    let countryCode = country.country_id.toLowerCase();
                    let flagImg = document.createElement("img");
                    flagImg.src = `https://flagcdn.com/w80/${countryCode}.png`;
                    flagImg.alt = country.country_id;
                    flagImg.classList.add("flag");
                    flagsDiv.appendChild(flagImg);
                });
            } else {
                resultDiv.innerText = "No data";
            }
        })
        .catch(error => {
            resultDiv.innerText = "Error fetching data.";
            console.error("Error:", error);
        });
}
