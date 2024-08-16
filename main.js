let tableData = '';
let html = '';
const table = document.querySelector('table');
const selectElement = document.querySelector('select');
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
  const selectedText = selectElement.options[selectElement.selectedIndex]
    .text;
    table.innerHTML = "";
    eplStandings(selectedText);
});

eplStandings("2024-2025")

function  todayFixture(selectedValue) {
 const fix24 = fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=${selectedValue}&s=2024-2025`)
  .then( response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
  
    data["events"].forEach((fixture) => {
      html += `
      <div class="inner-container">
        <p class="item1">${fixture.dateEvent}</p>
        <p class="item2">${(fixture.strTime).slice(0, 5)}</p>
        <div class="card">
           <div class="team-info">
              <img class="clubLogo" src="${fixture.strHomeTeamBadge}">
              <p>${fixture.strHomeTeam}</p>
            </div>
            <div class="scoreLine">
               <p> ${fixture.intHomeScore}  -  ${fixture.intAwayScore}</p>
            </div>
            <div class="team-info">
                <img class="clubLogo" src="${fixture.strAwayTeamBadge}">
                <p>${fixture.strAwayTeam}</p>
           </div>
         </div>
        <!-- <p><a class="youtube-link" href="${fixture.strVideo}">Highlights</a></p>-->
      </div>
      `
    });
      fixtureContainer.insertAdjacentHTML("beforebegin", html);
    });
}



const selectMatchday = document.querySelector('.matchday');
selectElement.addEventListener('change', () => {
  const selectedIndex = selectElement.selectedIndex;
  const selectedOption = selectElement.options[selectedIndex];
  const selectedValue = selectedOption.value;
  
  todayFixture(selectedValue)
});

//todayFixture("1");