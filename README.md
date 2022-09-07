# Trybe Futebol Clube

## Observações

  Projeto desenvolvido ao cursar Desenvolvimento Web na [Trybe](https://www.betrybe.com/). <br>
  
Todo desenvolvimento realizado por mim se localiza na pasta app/backend/src. As outras partes desse projeto foram providas pela **Trybe**<br>
_________________________________
<br>

## Contexto
  ![Exemplo app front](assets/front-example.png)
  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Nesse projeto, é construído um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento **respeita regras de negócio** providas no projeto e a API é capaz de ser consumida por um front-end já provido nesse projeto.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. 

  O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
<br>
_________________________________
<br>

## Técnologias e conhecimentos colado em prática
  - Docker;
  - TypeScript;
  - Node e Express;  
  - Mocha, Chai e Sinnon  
  - Sequelize e MySql;
  - Json Web Token;
  - Utilizar conceitos da Programação Orientada a Objetos e Conceitos de SOLID;  
  - Arquitetura MVC e API RESTful.

_________________________________
<br>

## Executando aplicação
  É necessário possuir o Git e Docker Compose ^v1.29 <br>
  Abrindo o terminal, execute: <br>
  ```
  git clone git@github.com:jonatasqueirozlima/trybe-futebol-clube.git
  cd trybe-futebol-clube
  npm install && npm run compose:up
  ```
  O Frontend está disponível na url: http://localhost:3000/
_________________________________
<br>

## Executando os testes
  Para rodar testes de cobertura no Backend, estando na pasta app/backend/ execute o comando: 
  ```
  npm run test:coverage
  ```

_________________________________
<br>

## Endpoints do servidor no Backend
<details>
  <summary><strong> Visualizar</strong></summary><br />

### 1 - Endpoint POST /login

- O endpoint é capaz de realizar um login e retornar um token;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
  }
  ```
- O campo `email` é obrigatório e deve ser válido no banco de dados.
- O campo `password` é obrigatório e deve ser válido no banco de dados.

- Caso 'email' e 'password' estejam corretos, retorna o `status 200` e um token válido.

### 2 - Endpoint GET /login/validate

- O endpoint retorna o tipo de acesso do usuário cadastrado. Devendo retornar o `status 200`, com os dados no corpo.

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado no endpoints POST `/login`.

### 3 - Endpoint GET /teams

- O endpoint retorna um array com todos os temes cadastrados. Devendo retornar o `status 200`, com os dados no corpo.

### 4 - Endpoint GET /teams/:id

- O endpoint retorna um time com base no id da rota. Devendo retornar o `status 200` ao fazer uma requisição com um time existente (ex: `/teams/1`).

### 5 - Endpoint GET /matches

- O endpoint retorna um array com todos os jogos cadastrados. Devendo retornar o `status 200`, com os dados no corpo.

### 6 - Endpoint GET /matches?inProgress=true

- O endpoint retorna um array com todos os jogos cadastrados que a partida ainda esteja em andamento. Devendo retornar o `status 200`, com os dados no corpo.

### 7 - Endpoint GET /matches?inProgress=false

- O endpoint retorna um array com todos os jogos cadastrados que a partida já tenha acabado. Devendo retornar o `status 200`, com os dados no corpo.

### 8 - Endpoint POST /matches

- O endpoint adiciona uma nova partida ao banco de dados;

- Este endpoint nessecita de um campo `authorization` no header da requisição com um token válido gerado no endpoints POST `/login`.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "homeTeam": 16,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ```

- O campo `homeTeam` deve ser o id de um time válido. Ele é obrigatório.
- O campo `awayTeam` deve ser o id de um time válido. Ele é obrigatório.
- O campo `homeTeam` não pode ser igual ao campo `awayTeam`.
- O campo `homeTeamGoals` é obrigatório.
- O campo `awayTeamGoals` é obrigatório.

- Caso esteja tudo certo, retorna o `status 201` e a nova partida no corpo.

### 9 - Endpoint PATCH /matches/:id/finish

- O endpoint finaliza uma partido em andamento disponibilizada pelo id da rota.

- Retorna o `status 200` e o seguinte corpo:

  ```json
  { "message": "Finished" }
  ```

### 10 - Endpoint PATCH /matches/:id

- O endpoint atualiza uma partida no banco de dados disponibilizada pelo id da rota.

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

- O campo `homeTeamGoals` é obrigatório.
- O campo `awayTeamGoals` é obrigatório.


- Caso esteja tudo certo, retorna o `status 200` e o seguinte corpo:

  ```json
  { "message": "Successfully updated" }
  ```

### 11 - Endpoint GET /leaderboard

- O endpoint retorna um array com o placar das partidas finalizadas de todos os times. Devendo retornar o `status 200`, com os dados no corpo.

-`Obs`: todas as informações do placar são fornecidas através de regras de negócio no backend, o frontend é respnsável apenas por reenderizar essas informações.

### 12 - Endpoint GET /leaderboard/home

- O endpoint retorna um array com o placar das partidas finalizadas de todos os times em casa. Devendo retornar o `status 200`, com os dados no corpo.

-`Obs`: todas as informações do placar são fornecidas através de regras de negócio no backend, o frontend é respnsável apenas por reenderizar essas informações.

### 13 - Endpoint GET /leaderboard/away

- O endpoint retorna um array com o placar das partidas finalizadas de todos os times visitantes. Devendo retornar o `status 200`, com os dados no corpo.

-`Obs`: todas as informações do placar são fornecidas através de regras de negócio no backend, o frontend é respnsável apenas por reenderizar essas informações.
</details>
<br>

_________________________________
<br>

## Navegando na aplicação

<details>
  <summary><strong> Login</strong></summary><br />
Primeiro, se autentique. No header clicando no botão 'Login'.

Utilize as credenciais abaixo:
```
email: admin@admin.com
password: secret_admin
```
</details>

<details>
  <summary><strong> Partidas </strong></summary><br />
[Criar partida] <br>
No canto superior direito tem a possibilidade de criar a partida. <br>
<br>
[Filtrar partidas]
No canto superior esquerdo tem a filtragem das partidas por 'Finalizadas' ou 'Em andamento'. <br>
<br>
[Editar partida]<br>
Para cada partida na tabela, possui um icone de lapis que clicando nele é possível editar os dados da respectiva partida, mudando o placar ou atualizar a partida como 'finalizada'.<br>
<br>
OBS: não é possível editar partida que já foi finalizada.
</details>

<details>
  <summary><strong> Classificação </strong></summary><br />
No header, no canto superior direito clicando no botão 'Classificação'. <br>
Uma visão geral da situação de cada time. <br>
<br>
É possível filtrar por classificação dos times<br>
- Times da casa<br>
- Times de fora<br>
- Geral, ambos times<br>
<br>
OBS: Os filtros do time de casa e time de fora ainda não foram implementados.
</details>