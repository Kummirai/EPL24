let tableData = '';
const table = document.querySelector('table');

async function eplStandings() {
  const url = 'https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2023-2024';
  
  try {
    const response = await
    fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    } const data = await
    response.json();
    console.log(data)
    for (let i = 0; i < 20; i++) {
      console.log(i)
      tableData = `
      <tr>
        <td>${data.table[i].intRank}</td>
        <td class="img"><img src="${(data.table[i].strBadge)}"/>  ${data.table[i].strTeam}</td>
        <td>${data.table[i].intPlayed}</td>
        <td>${data.table[i].intWin}</td>
        <td>${data.table[i].intDraw}</td>
        <td>${data.table[i].intLoss}</td>
        <td>${data.table[i].intPoints}</td>
        <td>${data.table[i].intGoalsFor}</td>
        <td>${data.table[i].intGoalsAgainst}</td>
        <td>${data.table[i].intGoalDifference}</td>
      </tr>`;
      table.insertAdjacentHTML("beforeend", tableData)
    }
    
  } catch (error) {
    console.error('fetch error:', error)
  }
}

eplStandings();