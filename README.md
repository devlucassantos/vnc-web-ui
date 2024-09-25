# vnc-web-ui

🌍 *[English](README.md) ∙ [Português](README_pt.md)*

`vnc-web-ui` is the repository dedicated to providing a web user interface to interact with the data of the platform [Você na Câmara (VNC)](#você-na-câmara-vnc).
In this repository, you will have access to the source code of the web application, which uses the hexagonal architecture and is designed to consume the reading API 
provided by the [vnc-read-api](https://github.com/devlucassantos/vnc-read-api) repository.

## How to Run

> Note that to correctly run `vnc-web-ui`, you will need to have the node.js tool installed (if you don't have it, click [here](https://nodejs.org/en/download/) to go to the installation documentation).

To execute the proper settings of the application, you will need to follow these steps:

1. Run the `npm install` command to download the project dependencies;
2. In the file (`.env`), which can be found at the root of the project, set the value of the variable `VITE_API_URL="<backend-url>"`, where `<backend-url>` will be the URL of the backend to be used in development.

Ready! The project is configured. From now on, every time you want to start the project, just run the `npm run dev` command. This way, the project will be available at the address `http://localhost:3000`.

## Você na Câmara (VNC)

Você na Câmara (VNC) is a news platform that seeks to simplify the propositions under debate in the Chamber of Deputies of Brazil aiming to 
synthesize the ideas of these propositions through the use of Artificial Intelligence (AI) so that these documents can have their ideas expressed
in a simple and objective way for the general population.