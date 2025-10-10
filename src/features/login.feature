# language: pt
Funcionalidade: Login na Aplicação Web e Navegação

  Como um usuário registrado
  Eu quero fazer login na aplicação
  Para que eu possa acessar a página de produtos

  Cenario: Login bem-sucedido e navegação para a página de produtos
    Dado que estou na página de login do SauceDemo
    Quando eu faço login com usuário "standard_user" e senha "secret_sauce"
    Então eu devo ser redirecionado para a página de produtos