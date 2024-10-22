<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estação Meteorológica</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="script.js"></script>
</head>

<body>

    <!-- Cabeçalho -->
    <header class="header">
        <!--<img src="logo-ifnmg.png" id="logo-ifnmg">-->
        <h1>Estação Meteorológica</h1>
        <nav>
            <ul>
                <li><a href=".">Dashboard</a></li>
                <li><a href="dados.html">Dados brutos</a></li>
            </ul>
        </nav>
    </header>

    <!-- Seção de Dados Atuais -->
    <section id="dados-atualizados" class="dados-atualizados">
        <div class="cards">
            <div class="card">
                <h3>🌡️ Temperatura</h3>
                <p><span id="temperatura">--</span></p>
            </div>
            <div class="card">
                <h3>🌪️ Pressão</h3>
                <p><span id="pressao">--</span></p>
            </div>
            <div class="card">
                <h3>💧 Umidade</h3>
                <p><span id="umidade">--</span></p>
            </div>
        </div>
    </section>

    <section class="visualizacao">
        <div class="graficos">
            <div class="vis-temperatura">
                <h1>Temperatura</h1>
                <canvas id="temperatura-graf"></canvas>
            </div>

            <div class="vis-pressao">
                <h1>Pressão</h1>
                <canvas id="pressao-graf"></canvas>
            </div>

            <div class="vis-umidade">
                <h1>Umidade</h1>
                <canvas id="umidade-graf"></canvas>
            </div>
        </div>
        <div class="pesquisa">
            <div id="inicio">
                <label for="dataInicio">Início:</label>
                <input type="date" id="dataInicio">
                <input type="time" id="horaInicio">
            </div>
            <div id="fim">
                <label for="dataFinal">Término:</label>
                <input type="date" id="dataFinal">
                <input type="time" id="horaFinal">
            </div>

            <button id="filtrar" onclick="filtrar()">Filtrar</button>
            <button id="filtrar" onclick="redefinir()">Redefinir</button>
        </div>

    </section>



    <!-- Rodapé -->
    <footer class="footer">
        <p>Estação Meteorológica &copy; 2024</p>
    </footer>

    <script>
        // Variáveis globais para armazenar o intervalo de filtro
        let filtroInicio = null;
        let filtroFinal = null;

        // Criação inicial dos gráficos
        const ctx = document.getElementById('temperatura-graf');
        const ctx2 = document.getElementById('pressao-graf');
        const ctx3 = document.getElementById('umidade-graf');

        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Inicialmente vazio
                datasets: [{
                    label: 'Temperatura',
                    data: [], // Inicialmente vazio
                    fill: true,
                    backgroundColor: 'rgb(252, 136, 136)',
                    borderColor: 'rgb(252, 37, 37)',
                    pointRadius: 1,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10 // Limitar o número de ticks no eixo x
                        }
                    },
                    y: {
                        min: 0,
                        max: 40
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: false
            }
        });

        const myLineChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: [], // Inicialmente vazio
                datasets: [{
                    label: 'Pressão',
                    data: [], // Inicialmente vazio
                    fill: true,
                    backgroundColor: 'rgb(105, 206, 206)',
                    borderColor: 'rgb(75, 192, 192)',
                    pointRadius: 1,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10 // Limitar o número de ticks no eixo x
                        }
                    },
                    y: {
                        min: 900,
                        max: 1100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: false
            }
        });

        const myLineChart3 = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: [], // Inicialmente vazio
                datasets: [{
                    label: 'Umidade',
                    data: [], // Inicialmente vazio
                    fill: true,
                    backgroundColor: 'rgb(85, 174, 252)',
                    borderColor: 'rgb(37, 152, 252)',
                    pointRadius: 1,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10 // Limitar o número de ticks no eixo x
                        }
                    },
                    y: {
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: false
            }
        });

        // Função para atualizar os gráficos
        // Função para atualizar os gráficos
        function updateCharts() {
            fetch('http://localhost:3000/api/historico')
                .then(response => response.json())
                .then(data => {
                    // Formatar hora
                    const hora = data.map(item => {
                        const date = new Date(item.data_hora);
                        const gmtMinus3 = new Date(date.getTime() - (3 * 60 * 60 * 1000));
                        return gmtMinus3.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
                    });

                    // Atualizar dados gerais
                    myLineChart.data.labels = hora.reverse();
                    myLineChart.data.datasets[0].data = data.map(item => item.temperatura).reverse();

                    myLineChart2.data.labels = hora;
                    myLineChart2.data.datasets[0].data = data.map(item => item.pressao_atmosferica).reverse();

                    myLineChart3.data.labels = hora;
                    myLineChart3.data.datasets[0].data = data.map(item => item.umidade).reverse();

                    // Aplicar o filtro se estiver definido
                    if (filtroInicio && filtroFinal) {
                        // Filtrar os dados com base nas datas em GMT
                        const dadosFiltrados = data.filter(item => {
                            const dataHoraItemGMT = new Date(item.data_hora).toISOString();
                            return dataHoraItemGMT >= filtroInicio && dataHoraItemGMT <= filtroFinal;
                        });

                        if (dadosFiltrados.length === 0) {
                            alert("Nenhum dado encontrado para o intervalo selecionado.");
                            return;
                        }

                        // Formatar a hora para exibição (convertendo de GMT para local)
                        const horaFiltrada = dadosFiltrados.map(item => {
                            const date = new Date(item.data_hora);
                            return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
                        });

                        // Atualizar os gráficos com os dados filtrados
                        myLineChart.data.labels = horaFiltrada.reverse();
                        myLineChart.data.datasets[0].data = dadosFiltrados.map(item => item.temperatura);
                        myLineChart.update();

                        myLineChart2.data.labels = horaFiltrada;
                        myLineChart2.data.datasets[0].data = dadosFiltrados.map(item => item.pressao_atmosferica);
                        myLineChart2.update();

                        myLineChart3.data.labels = horaFiltrada;
                        myLineChart3.data.datasets[0].data = dadosFiltrados.map(item => item.umidade);
                        myLineChart3.update();
                    } else {
                        // Atualizar gráficos com dados gerais
                        myLineChart.update();
                        myLineChart2.update();
                        myLineChart3.update();
                    }
                })
                .catch(error => console.error(error));
        }

        // Função para converter data e hora local para GMT (UTC)
        function localToGMT(dateString, timeString) {
            const localDateTime = new Date(`${dateString}T${timeString}:00`);
            return localDateTime.toISOString(); // Converte para o formato GMT (ISO 8601)
        }

        // Função para filtrar os dados
        function filtrar() {
            const dataInicio = document.getElementById('dataInicio').value;
            const horaInicio = document.getElementById('horaInicio').value;
            const dataFinal = document.getElementById('dataFinal').value;
            const horaFinal = document.getElementById('horaFinal').value;

            // Verificar se todas as entradas foram preenchidas
            if (!dataInicio || !horaInicio || !dataFinal || !horaFinal) {
                alert("Por favor, preencha todas as datas e horas.");
                return;
            }

            // Converter para GMT (UTC)
            const inicioGMT = localToGMT(dataInicio, horaInicio);
            const finalGMT = localToGMT(dataFinal, horaFinal);

            // Armazenar os filtros
            filtroInicio = inicioGMT;
            filtroFinal = finalGMT;

            // Fazer a requisição à API com os parâmetros de filtro em GMT
            fetch(`http://localhost:3000/api/historico?inicio=${inicioGMT}&final=${finalGMT}`)
                .then(response => response.json())
                .then(data => {
                    // Filtrar os dados com base nas datas em GMT
                    const dadosFiltrados = data.filter(item => {
                        const dataHoraItemGMT = new Date(item.data_hora).toISOString();
                        return dataHoraItemGMT >= inicioGMT && dataHoraItemGMT <= finalGMT;
                    });

                    if (dadosFiltrados.length === 0) {
                        alert("Nenhum dado encontrado para o intervalo selecionado.");
                        return;
                    }

                    // Formatar a hora para exibição (convertendo de GMT para local)
                    const hora = dadosFiltrados.map(item => {
                        const date = new Date(item.data_hora);
                        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
                    });

                    // Atualizar os gráficos com os dados filtrados
                    myLineChart.data.labels = hora.reverse();
                    myLineChart.data.datasets[0].data = dadosFiltrados.map(item => item.temperatura);
                    myLineChart.update();

                    myLineChart2.data.labels = hora;
                    myLineChart2.data.datasets[0].data = dadosFiltrados.map(item => item.pressao_atmosferica);
                    myLineChart2.update();

                    myLineChart3.data.labels = hora;
                    myLineChart3.data.datasets[0].data = dadosFiltrados.map(item => item.umidade);
                    myLineChart3.update();
                })
                .catch(error => console.error('Erro ao filtrar:', error));
        }

        // Função para redefinir os filtros e gráficos
        function redefinir() {
            document.getElementById('dataInicio').value = '';
            document.getElementById('horaInicio').value = '';
            document.getElementById('dataFinal').value = '';
            document.getElementById('horaFinal').value = '';

            // Limpar filtros
            filtroInicio = null;
            filtroFinal = null;

            // Recarregar os dados completos
            updateCharts();
        }
    </script>

</body>

</html>
