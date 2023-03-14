const factionModule = {

    factionList: async function () {
        const factions = await app.fetchGethWithPath("/factions");

        for (const faction of factions) {
            factionModule.addFactionToList(faction)
        }
    },

    addFactionToList: function (faction) {
        // On cherche la classe "factions-list"
        const container = document.querySelector('.factions-list');

        // On crée la div et on y insère le nom de la faction
        const newCountry = document.createElement('div');
        newCountry.classList.add('faction-name');
        newCountry.textContent = faction.name;
        container.append(newCountry);
    }

}