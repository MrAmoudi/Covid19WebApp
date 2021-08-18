
// assigning DOM elements
const form = document.querySelector("form");
const resultCountry = document.querySelector("#resultCountry");
const confirmedToday = document.querySelector("#confirmedToday");
const deathsToday = document.querySelector("#deathsToday");
const totalConfirmed = document.querySelector("#totalConfirmed");
const totalDeaths = document.querySelector("#totalDeaths");

let resetFields = () => {
    // Reset the fields for next submission for daily cases
    confirmedToday.innerText = "Todays cases: ";
    deathsToday.innerText = "Todays deaths: ";
    // Reset the fields for next submission for total cases
    totalConfirmed.innerText = "Total confirmed cases: "
    totalDeaths.innerText = "Total deaths: "
}


// list available countries for API
const listCountries = async () => {
    const res = await axios.get(`https://api.covid19api.com/countries`);
    const countries = res.data
    const arrCountries = []
    for (let country of countries) {
        arrCountries.push(country.Country);
    }
    const sortedCountriesArray = arrCountries.sort();
    const list1 = sortedCountriesArray.slice(0, 62);
    const list2 = sortedCountriesArray.slice(62, 124);
    const list3 = sortedCountriesArray.slice(124, 186);
    const list4 = sortedCountriesArray.slice(186, sortedCountriesArray.length - 1);

    const ul1 = document.querySelector(".listOne")
    const ul2 = document.querySelector(".listTwo")
    const ul3 = document.querySelector(".listThree")
    const ul4 = document.querySelector(".listFour")

    for (let i = 0; i < list1.length; i++) {
        const newLi = document.createElement("li");
        newLi.innerText = list1[i]
        ul1.append(newLi);
    }
    for (let i = 0; i < list2.length; i++) {
        const newLi = document.createElement("li");
        newLi.innerText = list2[i]
        ul2.append(newLi);
    }
    for (let i = 0; i < list3.length; i++) {
        const newLi = document.createElement("li");
        newLi.innerText = list3[i]
        ul3.append(newLi);
    }
    for (let i = 0; i < list4.length; i++) {
        const newLi = document.createElement("li");
        newLi.innerText = list4[i]
        ul4.append(newLi);
    }

}

listCountries();


form.addEventListener("submit", async function (e) {
    //    prevent auto submission of form
    e.preventDefault();
    try {
        // retrieve and initialize all required data
        const searchTerm = form.elements.country.value;
        const res = await axios.get(`https://api.covid19api.com/live/country/${searchTerm}`);
        const res2 = await axios.get(`https://api.covid19api.com/total/dayone/country/${searchTerm}`);
        resultCountry.classList.remove("errorClass");
        // resultCountry.style.color = "white";

        // assigning data from first response
        // const index = res.data.length - 1;
        const currentDay = res.data[res.data.length - 1];
        const countryName = currentDay.Country;
        const todayCases = currentDay.Confirmed;
        const todayDeaths = currentDay.Deaths;
        // assigning data from second response
        const totDay = res2.data[res2.data.length - 1];
        const totCases = totDay.Confirmed;
        const totDeaths = totDay.Deaths;

        resultCountry.innerText = "Country: ";
        resetFields();

        // append res1 data
        resultCountry.append(countryName);
        confirmedToday.append(todayCases);
        deathsToday.append(todayDeaths);
        // append res2 data
        totalConfirmed.append(totCases);
        totalDeaths.append(totDeaths);

    } catch (error) {
        const searchTerm = form.elements.country.value;
        resultCountry.classList.add("errorClass");
        resultCountry.innerText = `Error, could not retrieve data for "${searchTerm}", have a look below for a list of supported countries.`
        resetFields();
        console.log(error);

    }



})
