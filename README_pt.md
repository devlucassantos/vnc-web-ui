# vnc-web-ui

🌍 *[English](README.md) ∙ [Português](README_pt.md)*

`vnc-web-ui` é o repositório dedicado a fornecer uma interface de usuário web para interagir com os dados da plataforma
[Você na Câmara (VNC)](#você-na-câmara-vnc). Neste repositório, você terá acesso ao código-fonte da aplicação web, que utiliza
a arquitetura hexagonal e é projetada para consumir a API de leitura fornecida pelo repositório [vnc-read-api](https://github.com/devlucassantos/vnc-read-api).

## Como Executar

> Observe que para executar corretamente o `vnc-web-ui` você precisará ter a ferramenta node.js instalada (caso não tenha, clique [aqui](https://nodejs.org/en/download/) para ir para a documentação de instalação).

Para executar as configurações apropriadas da aplicação você precisará seguir os seguintes passos:

1. Execute o comando `npm install` para baixar as dependências do projeto;
2. No arquivo (`.env`), que pode ser encontrado na raiz do projeto, defina o valor da variável `VITE_API_URL="<url-do-backend>"`, onde `<url-do-backend>` será a URL do backend a ser utilizada no desenvolvimento.

Pronto! O projeto está configurado. A partir de agora, toda vez que quiser iniciar o projeto basta executar o comando `npm run dev`. Dessa forma, o projeto estará disponível no endereço `http://localhost:3000`.

## Você Na Câmara (VNC)

Você na Câmara (VNC) é uma plataforma de notícias que busca simplificar as proposições que tramitam pela Câmara dos
Deputados do Brasil visando sintetizar as ideias destas proposições por meio do uso da Inteligência Artificial (IA)
de modo que estes documentos possam ter suas ideias expressas de maneira simples e objetiva para a população em geral.