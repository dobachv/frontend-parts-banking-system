import {el} from 'redom';
import User from './api.js'
import { lookAccount } from './look-account';
import { validatorTransfor } from './validator';
import {saveToLocalStroge, chartArray, chartArrayColor} from './function.js'
import { chartCreat, chartCreatColor } from './chart.js';
import { fieldCard } from './field-cards.js';
import { lookBalance } from './look-balance.js';
import href1 from "./index.js"

export async function lookCard(account,token,balance){  
    let WorkApi = new User()  
    let NewList = [];
    main.innerHTML = '' ;   
    let preloader = document.getElementById('preloader');  
    if(preloader.classList.contains('preloader-hidden')){
        preloader.classList.remove('preloader-hidden')   }
    
    
   async function  chartArrUpdate(account,token){
        let rez= []
        let rez2= []
        let rez3= []
        let b =[]
        const a = await WorkApi.constructor.getAccount(account,token)
        b = a.payload.transactions
        for(let i = 0; i<a.payload.transactions.length; i++){ 
            let month = a.payload.transactions[i].date; 
            let bl = a.payload.transactions[i].amount
            let to = a.payload.transactions[i].to
            let from = a.payload.transactions[i].from
            rez = [...rez, {month,bl,to}] 
            rez2 = [...rez2, {month,bl,to}]       
            rez3 = [...rez3, {month,bl,to,from} ]  
            }
            return {rez, rez2,rez3,b}
    }  
     

    let array = await chartArrUpdate(account,token, balance)
    let chartArr6 = chartArray(account, array.rez, 6)
    let chartArr12 = chartArray(account, array.rez2, 12)
    let sixMonthArrayRez = chartArr6.sixMonthArrayRez;
    let chartArr12Trank = chartArrayColor(account, array.rez3, 12,chartArr12.sixMonthArrayRez)


    const lookAccountDom = lookAccount(account, balance, chartArr6.rez, array.b);
    const validationStates = {
        number: false,
        sum: false
      };
    lookAccountDom.btn.disabled = true;

    function updateButtonState() {
        lookAccountDom.btn.disabled = !Object.values(validationStates).every(Boolean);
        if (lookAccountDom.btn.disabled){
            lookAccountDom.btn.style.background = '#4B5563'
        } else {
            lookAccountDom.btn.style.background = '#116ACC'
        }
    }
    updateButtonState() 

    //валидация формы перевода
    lookAccountDom.inputNumber.addEventListener('keyup', () => {
        validationStates.number = validatorTransfor (lookAccountDom.inputNumber, lookAccountDom.invalidNumber,
        lookAccountDom.validNumberImg, lookAccountDom.invalidNumberImg,'Неверно введен номер карты')
        updateButtonState()
    })
    
    lookAccountDom.inputSum.addEventListener('keyup', () => {
        validationStates.sum = validatorTransfor (lookAccountDom.inputSum, lookAccountDom.invalidSum,
        lookAccountDom.validSumImg, lookAccountDom.invalidSumImg,'Неверна введена сумма')
        updateButtonState()
    })
    //Отправить
    lookAccountDom.btn.addEventListener('click',async event => {
        event.preventDefault();
        
         
        let transfer = await WorkApi.constructor.transferFunds(account, lookAccountDom.inputNumber.value, lookAccountDom.inputSum.value, token)    
        if(transfer.error === 'Invalid account from'){
            lookAccountDom.invalidAutorization.style.opacity = '1'
            lookAccountDom.invalidAutorization.textContent = 'Не указан адрес счёта списания, или этот счёт не принадлежит нам'
            lookAccountDom.invalidAutorization.style.color = '#EB5757'
        } else{
            if(transfer.error === 'Invalid account to') {                       
                    lookAccountDom.invalidAutorization.style.opacity = '1'
                    lookAccountDom.invalidAutorization.textContent = 'Не указан счёт зачисления, или этого счёта не существует'
                    lookAccountDom.invalidAutorization.style.color = '#EB5757'
            } else{
                    if(transfer.error === 'Invalid amount') {                       
                        lookAccountDom.invalidAutorization.style.opacity = '1'
                        lookAccountDom.invalidAutorization.textContent = 'Не указана сумма перевода, или она отрицательная'
                        lookAccountDom.invalidAutorization.style.color = '#EB5757'
                    } else{
                    if(transfer.error === 'Overdraft prevented') {                       
                        lookAccountDom.invalidAutorization.style.opacity = '1'
                        lookAccountDom.invalidAutorization.textContent = 'Bы попытались перевести больше денег, чем доступно на счёте списания'
                        lookAccountDom.invalidAutorization.style.color = '#EB5757'
                    } else {
                        lookAccountDom.invalidAutorization.style.opacity = '0'
                        lookAccountDom.balanceText.textContent = transfer.payload.balance + ' ₽'
                        if (localStorage.getItem('transfer')){
                            NewList =  JSON.parse(localStorage.getItem('transfer'))
                        }
                        if(!NewList.includes(lookAccountDom.inputNumber.value)){
                            NewList.push(lookAccountDom.inputNumber.value)                                    
                        } 
                        for (let i = 0; i < NewList.length; i++){
                            lookAccountDom.listNumber.append(el('option',NewList[i]))
                        }
                        saveToLocalStroge('transfer', NewList)
                        lookAccountDom.inputNumber.value = ''
                        lookAccountDom.inputSum.value = ''
                        main.innerHTML=''
                        const a = await WorkApi.constructor.getAccount(account,token)
                        lookCard(account,token,a.payload.balance)                       
                        
                    }
                    }
                }
             }    
        })

      
    //вернуться
    lookAccountDom.btnExit.addEventListener('click', async () => {
        history.pushState(null,"", 'page'); 
        fieldCard(token)

    })
    //график  
    chartCreat(lookAccountDom.chatrBalance, sixMonthArrayRez)       
     main.append(lookAccountDom.div)

     //клик по графику
    document.getElementById('chart-div2').addEventListener('click', () =>{
        history.pushState(null,"", account + 'history');
        main.innerHTML=''
        let sixMonthArrayRez12 = chartArr12.sixMonthArrayRez;
        let sixMonthArrayRez12Trank = chartArr12Trank.sixMonthArrayRez
       
        const lookBalanceDom = lookBalance(account, balance, chartArr12.rez, chartArr12Trank.middleRez, chartArr12Trank.rez, array.b);
        chartCreat(lookBalanceDom.chatrBalance, sixMonthArrayRez12)  
        chartCreatColor(lookBalanceDom.chatrBalanceTran, sixMonthArrayRez12Trank)  
        main.append(lookBalanceDom.div)

     
        //кнопка назад
        document.getElementById('main-btn-chart').addEventListener('click',() =>{
            main.innerHTML=''
            history.pushState(null,"",  account);
            lookCard(account,token,balance)
        })
    })

    //клик по истории 
    document.getElementById('history-container').addEventListener('click', () =>{
        history.pushState(null,"",  account + 'history');
        main.innerHTML=''
        let sixMonthArrayRez12 = chartArr12.sixMonthArrayRez;
        let sixMonthArrayRez12Trank = chartArr12Trank.sixMonthArrayRez
       
        const lookBalanceDom = lookBalance(account, balance, chartArr12.rez, chartArr12Trank.middleRez, chartArr12Trank.rez, array.b);
        chartCreat(lookBalanceDom.chatrBalance, sixMonthArrayRez12)  
        chartCreatColor(lookBalanceDom.chatrBalanceTran, sixMonthArrayRez12Trank)  
        main.append(lookBalanceDom.div)

       

        //кнопка назад
        document.getElementById('main-btn-chart').addEventListener('click',() =>{
            main.innerHTML=''
            history.pushState(null,"", account);
            lookCard(account,token,balance)
        })
    })
    window.addEventListener("popstate", (event) => {
        let currUrl = document.location.href 
        const mark = document.getElementById('header-btn-div').classList.contains('open')    
                if(!mark) {
                    history.pushState(null,"", href1); 
                    return}
                 else {
                    if(currUrl === href1 + account + 'history'){                    
                        main.innerHTML=''
                        let sixMonthArrayRez12 = chartArr12.sixMonthArrayRez;
                        let sixMonthArrayRez12Trank = chartArr12Trank.sixMonthArrayRez
                       
                        const lookBalanceDom = lookBalance(account, balance, chartArr12.rez, chartArr12Trank.middleRez, chartArr12Trank.rez, array.b);
                        chartCreat(lookBalanceDom.chatrBalance, sixMonthArrayRez12)  
                        chartCreatColor(lookBalanceDom.chatrBalanceTran, sixMonthArrayRez12Trank)  
                        main.append(lookBalanceDom.div)
                    } 
                       
                 }
               
    })

    preloader.classList.add('preloader-hidden')

}

