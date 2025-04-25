/// <reference types="cypress"/>



describe('Разработка frontend-части банковской системы для стартапа', () =>{
  it("Авторизация", () => {
    cy.visit('http://localhost:8080');
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click();  
  })

  it("Просмотреть счет", () => {
    cy.visit('http://localhost:8080');
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click(); 
    cy.wait(4000)
    cy.contains('Открыть').click();  
  })

  it("Перевод денег на счет", () => {
    cy.visit('http://localhost:8080');
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click(); 
    cy.contains('Открыть').click();  
    cy.wait(4000)
    cy.get('#input-number').type('61253747452820828268825011')
    cy.get('#input-sum').type('100')
    cy.contains('Отправить').click()

  })

  it("Создание счета", () => {
    cy.visit('http://localhost:8080');
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click(); 
    cy.wait(4000)
    cy.get('#main-btn').click();  
   
  })

  it("Открываем созданный счет", () => {
    cy.visit('http://localhost:8080');
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click();
    cy.wait(4000)
    cy.get('div')
    .filter('.card-div')
    .last()   
    .contains('Открыть').click();  
  })

  it("Пероеводим деньги со созданого счета", () => {
    let contextText
    cy.visit('http://localhost:8080');
    cy.get('#login').type('developer')
    cy.get('#password').type('skillbox')
    cy.contains('Войти').click();
    cy.wait(4000)
    cy.get('p').filter('.number-p').last().should(($p) =>{
      contextText = $p.text()
      return contextText
    })
    .then(()=>{
      cy.get('div')
      .filter('.card-div')
      .first()   
      .contains('Открыть').click();       
      cy.get('#input-number').type(contextText)
    })
    cy.get('#input-sum').type('100')
    cy.contains('Отправить').click()
    cy.contains('Вернуться назад').click();  
    cy.get('div')
      .filter('.card-div')
      .last()   
      .contains('Открыть').click();    
      cy.get('#input-number').type('61253747452820828268825011')
      cy.get('#input-sum').type('50')
      cy.contains('Отправить').click()
  })

})