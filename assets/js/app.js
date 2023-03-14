const app = {

    init: function () {
        console.log('app.init !');
        // app.listeners();
        factionModule.factionList(); 
        rankingModule.rankingList();
    },

    api_base_url: "http://localhost:3000",

    // Gère la connexion et récupération de données via Fetch sur les routes //!GET
    // (ex. path = "/admin/user")
    fetchGethWithPath: async function (path) {
        try {
            const response = await fetch(`${app.api_base_url}${path}`);
            const jsonData = await response.json();
            if(!response.ok) { throw new Error("Un problème horrible est survenu sur la requête HTTP")};
            return jsonData
        } catch (err) {
            console.log(err)
        }
    },

    listeners: function() {

    },
//------------------ EXEMPLES ----------------------//
    getDataFromAPI: async function () {
        // On charge la méthode d'appel à Fetch avec la route voulue
        const jsonData = await app.fetchGethWithPath("/admin/countries");
        // On génère notre boucle
        for (const country of jsonData) {
            this.makeCountryListInDOM(country);
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

document.addEventListener('DOMContentLoaded', app.init);