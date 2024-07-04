const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let cryptoData = [];


async function fetchData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        cryptoData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function fetchDataThen() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function renderTable(data) {
    const tableBody = document.getElementById('cryptoTable');
    tableBody.innerHTML = '';
    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name} image" width="30"></td>
        
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
            
        `;
    
        tableBody.appendChild(row);
    });
}

document.getElementById('search').addEventListener('input', function(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchValue) || 
        coin.symbol.toLowerCase().includes(searchValue)
    );
    renderTable(filteredData);
});

document.getElementById('sortMarketCap').addEventListener('click', function() {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

document.getElementById('sortChange').addEventListener('click', function() {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

// Fetch data on page load
fetchData();

