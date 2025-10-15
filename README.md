# Teste Outsera API & E2E

Um projeto de automação de testes utilizando Playwright e Cucumber para End-to-End (E2E), com foco em TypeScript, e estrutura para automação de testes de API.

## 🚀 Autor

**Ozéas Galdino**

## 🌟 Visão Geral do Projeto

Este projeto visa estabelecer uma base sólida para a automação de testes em aplicações web e APIs. Utilizando a metodologia Behavior-Driven Development (BDD) com Cucumber, ele permite escrever testes em uma linguagem clara e de fácil compreensão para todas as partes interessadas (stakeholders).

O foco principal é garantir a qualidade e a estabilidade das funcionalidades críticas da aplicação através de testes E2E com Playwright e preparar o terreno para a validação de APIs.

## ⚙️ Tecnologias Utilizadas

| Tecnologia          | Descrição                                                                      |
| :------------------ | :----------------------------------------------------------------------------- |
| **Node.js**         | Ambiente de tempo de execução JavaScript.                                      |
| **TypeScript**      | Superconjunto tipado de JavaScript que melhora a manutenibilidade do código.   |
| **Playwright**      | Framework de automação de navegadores (Chromium, Firefox, WebKit) para E2E.    |
| **Cucumber.js**     | Framework BDD que permite escrever especificações executáveis em linguagem Gherkin.|
| **cucumber-html-reporter** | Gerador de relatórios HTML bonitos a partir dos resultados do Cucumber JSON. |
| **ts-node**         | Executa arquivos TypeScript diretamente no Node.js sem pré-compilação.         |
| **Visual Studio Code** | Editor de código recomendado para desenvolvimento.                             |

## �� Dependências do Projeto

As principais dependências e devDependencies estão listadas no `package.json`:

*   `@cucumber/cucumber`: Framework Cucumber para BDD.
*   `@playwright/test`: Biblioteca Playwright para automação de testes de navegador.
*   `cucumber-html-reporter`: Ferramenta para gerar relatórios HTML detalhados dos testes Cucumber.
*   `ts-node`: Permite executar arquivos TypeScript diretamente.
*   `typescript`: Compilador TypeScript.

##  prerequisites

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

*   **Node.js**: Versão 16.x ou superior.
    *   Verifique a instalação com: `node -v`
*   **npm** (Node Package Manager): Vem junto com o Node.js.
    *   Verifique a instalação com: `npm -v`

## �� Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local:

1.  **Clone o repositório** (se aplicável, ou descompacte o projeto).
    ```bash
    git clone https://github.com/OGaldino/TesteOutSera.git
    # ou se for uma pasta local, navegue até ela
    cd C:\caminho\para\TesteOutSera\TesteOutSera
    ```

2.  **Navegue até o diretório raiz do projeto.**
    Certifique-se de que o seu terminal esteja no mesmo diretório onde o arquivo `package.json` está localizado.
    Exemplo: `C:\projetos\OzeasProjeto\TesteOutSera\TesteOutSera\`

3.  **Instale as dependências.**
    ```bash
    npm install
    ```
    Este comando instalará todas as dependências listadas no `package.json`.

4.  **Configure o `tsconfig.json`.**
    Certifique-se de que o arquivo `tsconfig.json` está na raiz do projeto e com o conteúdo adequado para o seu ambiente. Um exemplo robusto foi fornecido anteriormente.

## 📂 Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

## 📝 Como Executar os Testes

O projeto utiliza scripts `npm` para facilitar a execução dos testes.

### 🧪 Testes E2E (End-to-End)

Para executar todos os testes E2E e, em seguida, gerar o relatório HTML:

```bash
npm run run:all:e2e

### 🧪 Testes API 

Para executar todos os testes API  e, em seguida, gerar o relatório HTML:

```bash
npx playwright test

npx playwright test show-report

Para gerar relatório 
npx playwright show-report