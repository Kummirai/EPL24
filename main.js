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

function  todayFixture() {
 const fix24 = fetch('https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=1&s=2024-2025')
  .then( response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
  
    console.log(data);
      html = `
      <div class="inner-container">
        <div class="event-time">
            <p class="time">${(data.events[0].strTime).slice(0, 5)}hrs</p>
            <!--<p>${data.events[0].dateEvent}</p>-->
        </div>
        <div class="card">
           <div class="team-info">
              <img class="clubLogo" src="${data.events[0].strHomeTeamBadge}">
              <h4>${data.events[0].strHomeTeam}</h4>
            </div>
            <div class="scoreLine">
               <!--<h4><span class="home-score">${data.events[0].intHomeScore}</span>--><p>-</p><!-- <span class="away-score">${data.events[0].intAwayScore}</span></h4>-->
            </div>
            <div class="team-info">
                <img class="clubLogo" src="${data.events[0].strAwayTeamBadge}">
                <h4>${data.events[0].strAwayTeam}</h4>
           </div>
         </div>
         <!--<p><a class="youtube-link" href="${data.events[0].strVideo}">Highlights</a></p>-->
         <div class="event-time">
            <!--<p>${(data.events[0].strTime).slice(0, 5)}hrs</p>-->
            <p class="date">${data.events[0].dateEvent}</p>
        </div>
      </div>
      `;
      
      if(data.events[0].intAwayScore === "" | data.events[0].intHomeScore === ""){
        awayScore.innerHTML = "0";
      } 
      
      fixtureContainer.innerHTML = html;
    console.log(html)

    });
}

todayFixture();