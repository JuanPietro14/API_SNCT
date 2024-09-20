document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 200);
    });
});

////////////

// Função para buscar os dados da API e exibir no frontend
function fetchSensorData() {
    fetch('/api/sensordata') // Faz a requisição para a API
        .then(response => response.json())
        .then(data => {
            // Atualizar os valores no HTML
            document.querySelector('.card:nth-child(1) p').textContent = `A temperatura agora é ${data.temperatura}°C.`;
            document.querySelector('.card:nth-child(2) p').textContent = `A pressão agora é ${data.pressao} hPa.`;
            document.querySelector('.card:nth-child(3) p').textContent = `A umidade agora é ${data.umidade}%.`;
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Chama a função ao carregar a página
window.onload = fetchSensorData;


