const rankingModule = {

    rankingList: async function () {
        const rankings = await app.fetchGethWithPath("/rankings");
        let rank = 1;

        for (const ranking of rankings) {
            rankingModule.addRankingToList(ranking, rank);
            rank++;
        };

    },

    addRankingToList: function (ranking, rank) {
        const container = document.querySelector('.ranking-table tbody');

        const newEntry = document.createElement('tr');

        const newRank = document.createElement('th');
        newRank.textContent = rank;
        const newNickname = document.createElement('th');
        newNickname.textContent = ranking.ranking_player.name;
        const newFaction = document.createElement('th');
        newFaction.textContent = ranking.ranking_faction.name;
        const newValue = document.createElement('th');
        newValue.textContent = ranking.ranking;

        newEntry.append(newRank);
        newEntry.append(newNickname);
        newEntry.append(newFaction);
        newEntry.append(newValue);

        container.append(newEntry);

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