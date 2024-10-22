document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 200);
    });

    // Chama as funções ao carregar a página
    fetchSensorData();
    fetchHistoricData();

    // Atualiza os dados a cada 2s
    setInterval(fetchSensorData, 2000);
    setInterval(fetchHistoricData, 2000);
    setInterval(updateCharts, 2000);
});

////////////
    
// Função para buscar os dados da API e exibir no frontend
function fetchSensorData() {
    fetch('/api/sensordata') // Faz a requisição para a API
        .then(response => response.json())
        .then(data => {
            // Verificar se os dados estão definidos
            temperatura = data.temperatura !== undefined ? `${data.temperatura}°C` : '--';
            pressao = data.pressao !== undefined ? `${data.pressao} hPa` : '--';
            umidade = data.umidade !== undefined ? `${data.umidade}%` : '--';

            // Atualizar os valores no HTML
            document.querySelector('.card:nth-child(1) p').textContent = temperatura;
            document.querySelector('.card:nth-child(2) p').textContent = pressao;
            document.querySelector('.card:nth-child(3) p').textContent = umidade;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

async function fetchHistoricData() {
    try {
        const response = await fetch('/api/historico');
        const data = await response.json();
        const tableBody = document.querySelector('#historicoTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(row.data_hora).toLocaleString()}</td>
                <td>${row.temperatura} °C</td>
                <td>${row.umidade} %</td>
                <td>${row.pressao_atmosferica} hPa</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}