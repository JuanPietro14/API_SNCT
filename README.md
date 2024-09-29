# API_SNCT
 National science and technology week project - Meteorological Station

Smart Weather Station (temperature, humidity, atmospheric pressure) and send this data to an online platform for monitoring and analysis.


## ESTRUTURA BÁSICA DO PROJETO

### 1. **Estruturação do Projeto**
   - **Sensores e Hardware**: Os sensores que serão utilizados (temperatura, umidade, pressão atmosférica) estão conectados a um microcontrolador . Esse microcontrolador é capaz de coletar dados em tempo real e enviar esses dados para um servidor.
   - **Coleta de Dados e Back-End**: Script em Javascript que trabalha junto com o MySQL para fazer a coleta de dados do sensor e enviar as informações para o site. O script deve:
     - Receber os dados do sensor através de uma requisição HTTP (usando métodos como POST).
     - Processar e validar os dados.
     - Inserir os dados em um banco de dados (MySQL).

### 2. **Desenvolvimento da API **
   -   **API RESTful** permite o acesso aos dados armazenados no banco. A API deve ter os seguintes endpoints:
     - **GET /dados**: Retorna todos os dados coletados (com opção de filtros como data, tipo de sensor, etc.).
     - **GET /dados/{id}**: Retorna dados específicos de um sensor por ID.
     - **GET /estatisticas**: Retorna estatísticas processadas, como médias diárias de temperatura, umidade, pressão, etc.
     - A API também inclui validação de entrada, manipulação de erros e autenticação, caso o acesso aos dados seja restrito.

### 3. **Desenvolvimento do Front-End**
   - Um site responsivo e acessível utilizando **HTML, CSS e JavaScript** .
   - O front-end:
     - Exibe dados em tempo real recebidos da API.
     -  O site atualiza a cada 5 segundos de forma automática.
     - Fornece botões interativos onde o usuário irá interagir com os dados de temperatura, pressão e umidadde.
     - Incluir alertas ou notificações caso algum valor esteja fora do padrão aceitável.
 a autenticação e autorização se necessário (por exemplo, login para acessar páginas restritas).

### 4. **Manutenção e Expansão**
   - **Monitoramento**: Usar ferramentas para monitorar o desempenho do site e da API, como Google Analytics para o front-end ou ferramentas de monitoramento de servidores.
   - **Atualizações Futuras**: Planejar atualizações futuras, como a adição de novos tipos de sensores, mais funcionalidades no site, etc.

### Ferramentas e Tecnologias
- **Back-End**: Node.js (Express),
- **Banco de Dados**: MySQL.
- **Front-End**: HTML5, CSS3 e Javascript.
- **Servidores**: Express

