# API_SNCT
 National science and technology week project - Meteorological Station

Smart Weather Station (temperature, humidity, atmospheric pressure) and send this data to an online platform for monitoring and analysis.


## ESTRUTURA BÁSICA DO PROJETO

### 1. **Estruturação do Projeto**
   - **Sensores e Hardware**: Os sensores que serão utilizados (temperatura, umidade, pressão atmosférica) precisarão estar conectados a um microcontrolador . Esse microcontrolador deve ser capaz de coletar dados em tempo real e enviar esses dados para o servidor da escola.
   - **Coleta de Dados e Back-End**: Deve criar um script PHP que receba os dados enviados pelo microcontrolador. O script deve:
     - Receber os dados do sensor através de uma requisição HTTP (usando métodos como POST).
     - Processar e validar os dados.
     - Inserir os dados em um banco de dados (MySQL, por exemplo).

### 2. **Desenvolvimento da API **
   - Crie uma **API RESTful** que permita o acesso aos dados armazenados no banco. A API deve ter os seguintes endpoints:
     - **GET /dados**: Retorna todos os dados coletados (com opção de filtros como data, tipo de sensor, etc.).
     - **GET /dados/{id}**: Retorna dados específicos de um sensor por ID.
     - **GET /estatisticas**: Retorna estatísticas processadas, como médias diárias de temperatura, umidade, pressão, etc.
     - A API também deve incluir validação de entrada, manipulação de erros e autenticação, caso o acesso aos dados seja restrito.

### 3. **Desenvolvimento do Front-End**
   - Um site responsivo e acessível utilizando **HTML, CSS e JavaScript** (com um framework como React ou Vue.js).
   - O front-end deve:
     - Exibir dados em tempo real recebidos da API.
     - Mostrar gráficos e visualizações para facilitar a interpretação .
     - Fornecer filtros para que os usuários possam ver dados específicos (por exemplo, temperatura por sala, umidade ao longo do tempo).
     - Incluir alertas ou notificações caso algum valor esteja fora do padrão aceitável.

### 4. **Integração Front-End e Back-End**
   - **fetch API** ou **Axios** no front-end para consumir a API que você criou.
   - Configurar o front-end para atualizar automaticamente os dados em intervalos regulares (por exemplo, a cada 5 minutos) para mostrar informações em tempo real.
   - Realize a autenticação e autorização se necessário (por exemplo, login para acessar páginas restritas).

### 5. **Manutenção e Expansão**
   - **Monitoramento**: Usar ferramentas para monitorar o desempenho do site e da API, como Google Analytics para o front-end ou ferramentas de monitoramento de servidores.
   - **Atualizações Futuras**: Planejar atualizações futuras, como a adição de novos tipos de sensores, mais funcionalidades no site, etc.

### Sugestão de Ferramentas e Tecnologias
- **Back-End**: Node.js (Express), Python (Flask/Django)
- **Banco de Dados**: MySQL, PostgreSQL
- **Front-End**: React.js, Vue.js, Chart.js/D3.js
- **Servidores**: Nginx ou Apache
- **Monitoramento**: Grafana, Prometheus
