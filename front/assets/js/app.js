const app = {

    init: function () {
        console.log('app.init !');
        app.Listeners();
        app.getDataFromAPI();
    },

    api_base_url: "http://localhost:3000",

    Listeners: function() {

    },

    getDataFromAPI: async function () {
        try {
            const response = await fetch(`${app.api_base_url}/admin/countries`);
            const jsonData = await response.json();
            if(!response.ok) { throw new Error("Un problème horrible est survenu sur la requête HTTP")}
            console.log(jsonData);

            for (const country of jsonData) {
                this.makeCountryListInDOM(country);
            }

        } catch (error) {
            console.log(error);
        }
    },

    makeCountryListInDOM: function(country) {
        const template = document.getElementById('country-template');
        const newCountry = document.importNode(template.content, true);
        newCountry.querySelector('.country-name').textContent = country.name;

        const countriesContainer = document.getElementById('countries-section');
        countriesContainer.appendChild(newCountry);
    },
};

document.addEventListener('DOMContentLoaded', app.init );