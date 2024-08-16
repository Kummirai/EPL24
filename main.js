let tableData = '';
const table = document.querySelector('table');
const selectElement = document.querySelector('select');
const container  = document.querySelector('.container');

async function eplStandings(selectedText) {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=${selectedText}`;
  console.log(selectedText)
  try {
    const response = await
    fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    } const data = await
    response.json();
    console.log(data)
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