import {el} from 'redom';
import arrow  from './assets/images/arrow.svg'
import mail  from './assets/images/mail.png'
import error  from './assets/images/error.png'
import success  from './assets/images/success.png'
import { currentDate } from './function';

export function lookAccount(account,balance, max,array){
    let NewList = []
    if (localStorage.getItem('transfer')){
        NewList =  JSON.parse(localStorage.getItem('transfer'))
    }    
    const btn =  el('button', {class: 'transfer-btn btn', type: 'submit'}, 'Отправить',[
        el('img', {class: 'img-mail', src: mail})
    ])
    const inputSum =  el('input',{class: 'form-input', id: 'input-sum', placeholder: 'Введите сумму перевода', type: 'text'})
    const inputNumber =  el('input',{list: "list-number", class: 'form-input',  id: 'input-number', placeholder: 'Введите номер карты', type: 'text'})
    const listNumber = el('datalist', {id: 'list-number'}) 
    const invalidAutorization =  el('p', {class: "avtorezation-invalid"}, '' )
    const invalidNumber= el('p', {class: "number-invalid invalid"}, '')
    const invalidSum =  el('p', {class: "sum-invalid invalid"}, '' )
    const invalidNumberImg = el('img', {class:'number-img-inval', src: error})
    const validNumberImg = el('img', {class:'number-img-val', src: success})
    const invalidSumImg = el('img', {class:'sum-img-inval', src: error})
    const validSumImg = el('img', {class:'sum-img-val', src: success})
    const chatrBalance = el('canvas', {id:'chart-balance', class: 'chart-balance', style:{height:'208px', width:'472px'}}) 
    const historyTbody = el('tboby', {class:'history-tbobe'})
    // Истороия перевода
    const historyDiv = el ('div', {class:'history-container', id:'history-container'},[
        el('h3', {class:'h3 list-reset'}, 'История перевода'),
        el('table',{class: 'history-table'}, [
            el ('div', {class: 'div-thead'},[
                el('thead', {class:'history-thead'}, [
                    el('th',{class:'th'}, 'Счёт отправителя'),
                    el('th',{class:'th th-to'}, 'Счёт получателя'),
                    el('th', {class:'th'},'Сумма'),
                    el('th',{class:'th-date th'}, 'Дата')
                ])
            ]),
            historyTbody
           
        ])
    ])
    // таблица 
    let n = 0;
    if(array.length > 9) n = array.length-10
    for ( let i = array.length-1; i > n-1; i--){
        let historyTr = document.createElement('tr');
        historyTr.append(el('td',{class:'balance list-reset td'}, array[i].from))
        historyTr.append(el('td',{class:'balance list-reset td '}, array[i].to))
        if (account === array[i].from ){
            historyTr.append(el('td',{class:'balance list-reset td', style:{color:'red'}}, '- ' + array[i].amount + '  ₽'))
        } else {
            historyTr.append(el('td',{class:'balance list-reset td', style:{color:'green'}}, '+ ' + array[i].amount + '  ₽'))
        }
        historyTr.append(el('td',{class:'balance list-reset td'}, currentDate(array[i].date)))
        historyTbody.append(historyTr)
    }

    const chartDiv = el ('div', {class: 'chart-container'},[
        el('h3',{class:'h3 list-reset'}, 'Динамика баланса'),
        el('div', {class: 'chart-div'},[           
            chatrBalance,         
            el('div', {class: 'chart-div2 chart-cur ',id: 'chart-div2'}),
            el('p', {class:'max-balance chart-p list-reset'}, max),
            el('p', {class:'min-balance chart-p list-reset'},'0')
           
        ])
    ])

    //форма перевода
    const checkDiv = el('div', {class: 'check-div' },[
        el('div', {class: 'transfer-container'},[
            el('h3',{class:'h3 list-reset'}, 'Новый перевод'),
            el('form', {class:'form-div'},[                        
                el('div',{class:'form-block'},[
                    el('label',{class:'form-label'},'Номер счёта получателя'),
                    inputNumber,
                    listNumber,
                    invalidNumber,
                    invalidNumberImg,
                    validNumberImg
                ]),
                el('div',{class:'form-block'},[
                    el('label',{class:'form-label'},'Сумма перевода'),
                    inputSum,
                    invalidSum,
                    invalidSumImg,
                    validSumImg
                ]),
                btn,
                invalidAutorization 
            ])            
        ]),        
        chartDiv,
        historyDiv       
    ])

    for (let i = 0; i < NewList.length; i++){
        listNumber.append(el('option',NewList[i]))
    }  
   
    const balanceText = el('p', {class: 'inf-balance-p list-reset'},balance + '  ₽')
    //кнопка вернуться назад
    const btnExit = el('button', {class: 'btn main-btn arrow', id: 'main-btn1'}, '   Вернуться назад',[
        el('img', {class: 'img-arrow', src: arrow})
    ])
    //шапка страницы
    const div = el('div',{class:'container main-container', id: 'div-field'},[
        el('div', {class: 'title-div check'}, [
            el('h2', {class:'h2 main-h2 list-reset'},'Просмотр счета'),                    
            btnExit

        ]),
        el('div', {class: 'inf-div'},[
            el('p',{class: 'inf-p list-reset'},'№ ' + account),
            el('div', {class: 'inf-balance'},[
                el('h3',{class:'inf-h3 h3 list-reset'}, 'Баланс'),
                balanceText
            ])
        ]),
        checkDiv,
    ])

    return{
        div, invalidNumberImg, invalidNumber, invalidSum,
        invalidSumImg,validNumberImg,validSumImg,
        inputSum, inputNumber,btn, btnExit, balanceText,
        invalidAutorization , listNumber, chatrBalance
    }
}
