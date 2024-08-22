let tableData = '';
let html = "";
const table = document.querySelector('table');
const league = document.getElementById('league');
const selectElement = document.getElementById('standings');
const leagueId = document.getElementById('leagueMatches');
const selectMatchday = document.getElementById('matchday');
const container  = document.querySelector('.container');
const homeScore  = document.querySelector('.home-score');
const awayScore  = document.querySelector('.away-score');
const fixtureContainer  = document.querySelector('.fixture-container');

async function eplStandings() {
  const leagueValue = league.value;
  const leagueSeason  = selectElement.options[selectElement.selectedIndex].text;
  
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${league.value}&s=${leagueSeason}`;
  try {
    const response = await
    fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    } const data = await
    response.json();
    table.innerHTML ='';
    const headers = `
    <tr>
    <th></th>
    <th>Club Name</td>
    <th>MP</th>
    <th>W</th>
    <th>D</th>
    <th>L</th>
    <th>Pts</th>
    <th>GF</th>
    <th>GA</th>
    <th>GD</th>
  </tr>`;
  table.insertAdjacentHTML("afterbegin", headers)
    for (let i = 0; i < 20; i++) {
      tableData = `
      <tr class="myData">
        <td class="pos-pts">${data.table[i].intRank}</td>
        <td class="img"><img src="${(data.table[i].strBadge)}"/>  ${data.table[i].strTeam}</td>
        <td>${data.table[i].intPlayed}</td>
        <td>${data.table[i].intWin}</td>
        <td>${data.table[i].intDraw}</td>
        <td>${data.table[i].intLoss}</td>
        <td class="pos-pts">${data.table[i].intPoints}</td>
        <td>${data.table[i].intGoalsFor}</td>
        <td>${data.table[i].intGoalsAgainst}</td>
        <td>${data.table[i].intGoalDifference}</td>
      </tr>`;
      table.insertAdjacentHTML("beforeend", tableData)
      //table.innerHTML = tableData;
    }
    
  } catch (error) {
    console.error('eplStandings error:', error)
  }
}

async function todayFixture() {
  const matchDay = selectMatchday.value;
  const leagueMatches = leagueId.value;
  
  const fix24 = fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=${leagueMatches}&r=${matchDay}&s=2024-2025`)
  .then( response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
    html = '';
    data["events"].forEach((fixture) => {
      const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept","Oct", "Nov", "Dec"];
      
      const month = parseInt(((fixture.dateEvent).slice(5, 7)), 10);
      
      const day = (fixture.dateEvent).slice(8);
      const league = fixture.strLeague;
      console.log(league)
      
      let sast = Number(fixture.strTime.slice(0, 2));
      
      if(league === "English Premier League"){
        sast = sast + 2
      } else if (league === "German Bundesliga") {
        sast = sast + 1
      } else if (league === "Spanish La Liga") {
        sast = sast + 1
      } else if (league === "Italian Series A") {
        sast = sast + 1
      } else if (league === "French Ligue 1") {
        sast = sast + 1
      }
      
      if(fixture.intHomeScore === null){
        fixture.intHomeScore = "";
      };
      
      if (fixture.intAwayScore === null) {
        fixture.intAwayScore = ""
      }
      html += `
      <div class='outer-container'>
      <div class="fixture">
       <div class="event-date">
      <p>${sast}${(fixture.strTime).slice(2, 5)}</p>
      <p class="month">${day} ${months[month]}</p>
    </div>
    <div class="container">
      <div class="homeTeam team">
        <p class="teamName">${fixture.strHomeTeam}</p>
        <img src="${fixture.strHomeTeamBadge}" alt="">
      </div>
      <div class="scoreLine">
        <p class="homeScore">${fixture.intHomeScore}</p>
        <p class="symbol">-</p>
        <p class="awayScore">${fixture.intAwayScore}</p>
      </div>
      <div class="awayTeam team">
        <img src="${fixture.strAwayTeamBadge}" alt="">
        <p class="teamName">${fixture.strAwayTeam}</p>
      </div>
    </div>
    </div>
    </div>`});
    
      fixtureContainer.innerHTML = html;
  });
  
}

league.addEventListener('change', eplStandings);
selectElement.addEventListener('change', eplStandings);

eplStandings("2024-2025")

leagueId.addEventListener('change', todayFixture);
selectMatchday.addEventListener('change', todayFixture);
