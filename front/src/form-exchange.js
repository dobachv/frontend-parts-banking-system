import { lookValuta } from './look-valuta.js'
import {setChildren } from 'redom'
import User from './api.js'
import { validatorTransfor} from './validator.js'

export async function formExchange(token){
    const main = document.getElementById('main')   
    main.innerHTML='';
    const mainContainer = await lookValuta(token) 
    mainContainer.input.value = ''
    setChildren(main, mainContainer.div)
        // активность кноприки "Вход"
    mainContainer.btn.disabled = true;  
    const validationStates = {
        sum: false
    };

    function updateButtonState() {
        mainContainer.btn.disabled = !Object.values(validationStates).every(Boolean);
        if (  mainContainer.btn.disabled){
            mainContainer.btn.style.background = '#4B5563'
        } else {
            mainContainer.btn.style.background = '#116ACC'
        }
    }
    updateButtonState() 
     //валидация формы перевода
     mainContainer.input.addEventListener('keyup', () => {
        validationStates.sum = validatorTransfor (mainContainer.input, mainContainer.invalidSum,
            mainContainer.validSumImg, mainContainer.invalidSumImg,'Неверна введена сумма')
        updateButtonState()
    })
    
        mainContainer.btn.addEventListener('click', async event => {
            event.preventDefault();
            let WorkApi = new User()  
            let exchange = await WorkApi.constructor.exchangeCurrency(mainContainer.exchangeFrom.value, mainContainer.exchangeTo.value,
                mainContainer.input.value,token ) 
                const invalidAutorization = mainContainer.invalidAutorization 
            if(exchange.error === 'Unknown currency code'){
                invalidAutorization.style.opacity = '1'
                invalidAutorization.textContent = 'Hеверный валютный код'
                invalidAutorization.style.color = '#EB5757'
            } else{
                if(exchange.error === 'Not enough currency') {                       
                    invalidAutorization.style.opacity = '1'
                    invalidAutorization.textContent = 'На валютном счёте списания нет средств'
                    invalidAutorization.style.color = '#EB5757'
                } else{
                        if(exchange.error === 'Invalid amount') {                       
                           invalidAutorization.style.opacity = '1'
                           invalidAutorization.textContent = 'Не указана сумма перевода, или она отрицательная'
                           invalidAutorization.style.color = '#EB5757'
                        } else{
                        if(exchange.error === 'Overdraft prevented') {                       
                           invalidAutorization.style.opacity = '1'
                           invalidAutorization.textContent = 'Bы попытались перевести больше денег, чем доступно на счёте списания'
                            invalidAutorization.style.color = '#EB5757'
                        } else {
                            invalidAutorization.style.opacity = '0'
                            mainContainer.input.value = ''
                            main.innerHTML=''  
                            formExchange(token)    
                        }
                        }
                    }
                 }  

        })
    
}