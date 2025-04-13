# Projeto-Hotel



<p align="center"> 
      <a>
            <img src="https://img.shields.io/badge/Backend Language%3A-Java-red"/>
      </a>
      <a>
            <img src="https://img.shields.io/badge/Banco%3A-Postgres-yellow"/>
      </a>
      <a>
            <img src="https://img.shields.io/badge/Frontend %3A-React.JS-blue"/>
      </a>
      <a>
            <img src="https://img.shields.io/badge/Framework%3A-SpringBoot-green"/>
      </a>
      <a>
            <img src="https://img.shields.io/badge/ProjetoPessoal%3A-Portifolio-orange"/>
      </a>
</p>


Hotel – Sistema de Gestão de Comandas por Quarto
Um sistema web para gestão de comandas vinculadas aos quartos de hóspedes em hotéis fazenda. A ideia é que o cliente faça check-in, receba um número de quarto, e todos os pedidos em restaurante, bar ou outros serviços sejam automaticamente vinculados a esse número.


Tecnologias Utilizadas
Back-end:

* Java 17

* Spring Boot

* Swagger (para documentação dos endpoints)

* PostgreSQL

Front-end:

* React

 * MUI (Material UI)

 Funcionalidades

* Cadastro e check-in de hóspedes

* Associação de hóspedes a quartos

* Registro de pedidos vinculados ao número do quarto

* Painel de controle para funcionários acompanharem as comandas

* Responsivo e adaptado para uso em tablets


<p align="right">(<a href="#top">Scroll to top</a>)</p>


Como Rodar o Projeto Localmente

Pré-requisitos

* Java 17+

* Node.js (versão 16 ou superior recomendada)

* PostgreSQL

* Docker (opcional, mas recomendado para facilitar o setup)

* Maven

Configurando o Banco de Dados
Opção 1 - Local:

* Crie um banco PostgreSQL chamado hotel_fazenda.

* Atualize o application.properties com as credenciais:

  EXEMPLO:

  ```
  spring.datasource.url=jdbc:postgresql://localhost:5432/hotel_fazenda
  spring.datasource.username=seu_usuario
  spring.datasource.password=sua_senha

  ```
Back-end (Spring Boot)
 
  ```
  cd backend
  ./mvnw spring-boot:run
  ```

A API estará disponível em: http://localhost:8080
Documentação Swagger: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html#/)
  
Front-end (React + MUI)

```
cd frontend
npm install
npm start

```

A aplicação estará disponível em: http://localhost:3000


<p align="right">(<a href="#top">Scroll to top</a>)</p>


📁 Estrutura do Projeto

```
/backend
  └── src
      └── main
          └── java
              └── com.hotel
                  └── controller
                  └── DTO
                  └── entity
                  └── enuns
                  └── repository
                  └── service
                  └── utils
            
/frontend
  └── src
      └── components
      └── pages
      └── services
      └── App.jsx


```

Contribuidores

| Avatar            							| integrante         | Função           		| GitHub                                                      | LinkedIn                                              |
| -------------------------------------------- | ---------------- | ---------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| <img src = "Documentation/Team/Michael.jpeg" width="60" >|__Michael Felipe__| *Fullstack* | [![](https://bit.ly/3f9Xo0P)](https://github.com/Michaelfss/Michaelfss) | [![](https://bit.ly/2P1ZogM)](https://www.linkedin.com/in/michael-felipe-573b64167) |
| <img src = "Documentation/Team/Ana Clara.jpeg" width="60" >|__Ana Clara Leal__| *Fullstack* | [![](https://bit.ly/3f9Xo0P)](https://github.com/heyanaleal)      | [![](https://bit.ly/2P1ZogM)](https://www.linkedin.com/in/ana-clara-oliveira-leal-723169220/) |





