# language: pt
Funcionalidade: Fluxo de Checkout de E-commerce no SauceDemo

  Como um cliente de e-commerce
  Eu quero adicionar produtos ao carrinho, preencher dados e finalizar a compra
  Para que eu possa "comprar" meus produtos (simulado)

  Cenario: Compra bem-sucedida de um produto no SauceDemo
    Dado que estou logado no SauceDemo
    Quando eu adiciono "Sauce Labs Backpack" ao carrinho
    E eu visualizo o carrinho de compras
    E eu continuo para o checkout
    E eu preencho os dados de entrega no checkout:
      | Nome   | Sobrenome | CEP     |
      | João   | Silva     | 01000-000 |
    E eu finalizo a compra
    Então eu devo ver uma mensagem de "Thank you for your order!"
    E eu devo estar na página de confirmação de pedido