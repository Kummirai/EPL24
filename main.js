let tableData = '';
let html = "";
const table = document.querySelector('table');
const selectElement = document.getElementById('standings');
const container  = document.querySelector('.container');
const homeScore  = document.querySelector('.home-score');
const awayScore  = document.querySelector('.away-score');
const fixtureContainer  = document.querySelector('.fixture-container');

async function eplStandings(selectedText) {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=${selectedText}`;
  try {
    const response = await
    fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    } const data = await
    response.json();
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

selectElement.addEventListener("change", function(event) {
  const selectedText = selectElement.options[selectElement.selectedIndex].text;
    table.innerHTML = "";
    eplStandings(selectedText);
});

eplStandings("2024-2025")

function  todayFixture(selectedValue) {
 const fix24 = fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=${selectedValue}&s=2024-2025`)
  .then( response => {
    return response.json();
  })
  .then(data => {
    html = '';
    data["events"].forEach((fixture) => {
      if(fixture.intHomeScore === null){
        fixture.intHomeScore = "";
      };
      
      if (fixture.intAwayScore === null) {
        fixture.intAwayScore = ""
      }
      html += `
      <div class='outer-container'>
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
    </div>`});
    
      fixtureContainer.innerHTML = html;
  });
  
}

const selectMatchday = document.getElementById('matchday');
selectMatchday.addEventListener('change', () => {
  todayFixture(selectMatchday.value)
  console.log(selectMatchday.value)
});

const league = document.getElementById('league');
league.addEventListener('change', () => {
  fixtureContainer.style.display = "none";
  todayFixture(selectM.value)
  console.log(selectMatchday.value)
});

/*setInterval(() => {
  todayFixture("1")
  console.log("i ran")
}, 120000);

console.log("i am running")*/