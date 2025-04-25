import {el} from 'redom';
import arrow  from './assets/images/arrow.svg'
import { currentDate } from './function';
import Card from './pagination.js';


export function historyTr(array, length,n, account, container){
    n = (n<0) ? -1 : n
    for ( let i = length-1; i > n; i--){
        let historyTr = document.createElement('tr');
        historyTr.append(el('td',{class:'balance list-reset td'}, array[i].from))
        historyTr.append(el('td',{class:'balance list-reset td '}, array[i].to))
        if (account === array[i].from ){
            historyTr.append(el('td',{class:'balance list-reset td', style:{color:'red'}}, '- ' + array[i].amount + '  ₽'))
        } else {
            historyTr.append(el('td',{class:'balance list-reset td', style:{color:'green'}}, '+ ' + array[i].amount + '  ₽'))
        }
        historyTr.append(el('td',{class:'balance list-reset td'}, currentDate(array[i].date)))
        container.append(historyTr)
        }
}

export function lookBalance(account,balance, max, middle, sum,array){
    const paginationContainer = el('div',{class: 'pagination-container'})
    const historyTbody = el('tboby', {class:'history-tbobe'})
    // Истороия перевода
    const historyDiv = el ('div', {class:'history-container'},[
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
            historyTbody,
            paginationContainer,
           
        ])
    ])
    
    //Пагинация кнопки
    if (array.length < 26){
        // таблица 
        historyTr(array,array.length,-1,account,historyTbody)
    } else{
        let l = (array.length % 25 === 0)? (array.length / 25 ): (Math.trunc(array.length / 25) + 1)

        historyTr(array,array.length,(array.length - 26),account,historyTbody)
        for (let i = 0; i< l; i++){ 
         let card =    new Card(i+1,array,account,historyTbody).paginationCreate()
         paginationContainer.append(card)
        }
    }
   
    


    const chatrBalance = el('canvas', {id:'chart-balance', class: 'chart-balance', width:"1200" } ) 
    const chatrBalanceTran = el('canvas', {id:'chart-balance-tran', class: 'chart-balance', width:"1200" }) 
    //динамика баланса 
    const checkDiv = el('div', {class: 'check-div bt' },[
        el('div', {class: 'chart-bl-container'},[
            el('h3',{class:'h3 list-reset'}, 'Динамика баланса'),
            el('div', {class: 'chart-bl-div'},[           
            chatrBalance,         
                el('div', {class: 'chart-div2',id: 'chart-div2'}),
                el('p', {class:'max-bl-balance chart-p list-reset'}, max),
                el('p', {class:'min-bl-balance chart-p list-reset'},'0')           
            ])
        ]),        
             
    ])

     //Соотношение входящих исходящих транзакций
     const middleP = el('p', {class: 'middle-balance chart-p list-reset' }, middle)
     const checkTranDiv = el('div', {class: 'check-div bt' },[
        el('div', {class: 'chart-bl-container'},[
            el('h3',{class:'h3 list-reset'}, 'Соотношение входящих исходящих транзакций'),
            el('div', {class: 'chart-bl-div'},[           
                chatrBalanceTran,         
                el('div', {class: 'chart-div2',id: 'chart-div3'}),
                el('p', {class:'max-bl-balance chart-p list-reset'}, sum),
                middleP,
                el('p', {class:'min-bl-balance chart-p list-reset'},'0')           
            ])
        ]),        
             
    ])

    

    let prMiddle = 100 * middle / sum
    if(prMiddle === 0 ){
        middleP.style.bottom = '20px'
    } else {
        if (prMiddle > 80) {
            middleP.style.bottom = '170px'
        } else{
            if ( prMiddle < 10 ) {
                middleP.style.bottom = '35px'}
                else{
                middleP.style.bottom =  1.74 * prMiddle + 20 + 'px'
            }
        }
       
        }
    //кнопка вернуться назад
    const btnExit = el('button', {class: 'btn main-btn arrow', id: 'main-btn-chart'}, '   Вернкться назад',[
        el('img', {class: 'img-arrow', src: arrow})
    ])
    const balanceText = el('p', {class: 'inf-balance-p list-reset'},balance + '  ₽')
     //шапка страницы
    const div = el('div',{class:'container main-container', id: 'div-field'},[
        el('div', {class: 'title-div check'}, [
            el('h2', {class:'h2 main-h2 list-reset'},'История баланса'),                    
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
        checkTranDiv,
        historyDiv
    ])

    return {div,chatrBalance,chatrBalanceTran}
}