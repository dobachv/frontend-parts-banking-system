import {el} from 'redom';
import User from './api.js'
import arrowGreen  from './assets/images/arrow-green.png'
import arrowRed  from './assets/images/arrow-red.png'
import error  from './assets/images/error.png'
import success  from './assets/images/success.png'

export async function lookValuta(token){
     //Валютный обмен 
     const invalidAutorization =  el('p', {class: "avtorezation-invalid"}, '' )
     const invalidSum =  el('p', {class: "sum-invalid invalid"}, '' )
     const invalidSumImg = el('img', {class:'sum-img-inval exchange', src: error})
     const validSumImg = el('img', {class:'sum-img-val exchange', src: success})
     const input = el('input', {class:'exchange-input'})
     const valutaDiv = el('div', {class: 'valuta-div'})
     const btn =  el('button', {class: 'exchange-btn btn', type: 'submit'}, 'Обменять')
     const courseDiv = el('div', {class: 'course-div'})
     const exchangeFrom = el('select', {class:'exchange-select mr-r',id:'exchange-from'})
     const exchangeTo =   el('select', {class:'exchange-select',id:'exchange-to'}, )
     const checkDiv = el('div', {class: 'check-div bt' },[
        el('div', {class:'val-cour'},[
            el('div', {class: 'valuta-container mr-bt-30'},[
                el('h3',{class:'h3 list-reset'}, 'Ваши валюты'),
                valutaDiv
            ]), 
            el('div', {class: 'valuta-container '},[
                el('h3',{class:'h3 list-reset'}, 'Обмен валюты'),
                el('form',{ class:'exchange-form'},[
                    el('div',{class: 'exchange-left mr-r'},[
                        el('div',{ class: 'mr-bt-20 flex'},[
                            el('label',{class:'form-label label-mr'},'Из'),
                            exchangeFrom,
                            el('label',{class:'form-label label-mr'},'в'),
                            exchangeTo
                        ]),
                        el('div',{ class: 'mr-bt-20 flex form-block'}, [
                            el('label',{class:'form-label label-mr'},'Сумма'),
                            input,
                            invalidSum,
                            invalidSumImg,
                            validSumImg
                        ]),                        
                ]),
                btn               
            ]),
            invalidAutorization
        ]),       
        ]),
        el('div',{ class:'course-container'},[
            el('h3',{class:'h3 list-reset'}, 'Изменение курсов в реальном времени'),
            courseDiv
        ] )   
    ])

    let WorkApi = new User()  
    let a = await WorkApi.constructor.getCurrencyAccounts(token) 
    let b = await WorkApi.constructor.getKnownCurrwncies()    
    let c = await WorkApi.constructor.getChangedCurrency()


    //Изменение курсов в реальном времени
     c.onmessage = (event) => {
        let g =JSON.parse(event.data)
        if(g.type === 'EXCHANGE_RATE_CHANGE'){
            let img
            let pointP= el('p',{class:'point-p list-reset'})
            if(g.change === -1) {
                img = el('img',{class:'img-arrow-red',src: arrowRed})
                pointP.style.color= 'red'
            } else{
                if(g.change === 1) {
                    img = el('img',{class:'img-arrow-green',src: arrowGreen})
                    pointP.style.color= '#76CA66'
                }
            }
            let pDiv = el('div', {class: 'div-list-course'},[
                el('p',{class:'val-p list-reset'},g.from+'/'+g.to),
                pointP,
                el('p',{class:'money-p list-reset'},g.rate ),
                img
            ])
            

            courseDiv.append(pDiv)
        }
    }
   
    //заполнение блока "ваши валюты"
    let aArray=a.payload
    let bArray =b.payload
    if(bArray.length>0){
        for (let i=0; i<bArray.length; i++){
            let index = bArray[i]
            let pDiv = el('div', {class: 'div-list'},[
                el('p',{class:'val-p list-reset'},aArray[index].code ),
                el('p',{class:'point-p list-reset'}, ),
                el('p',{class:'money-p list-reset'},aArray[index].amount )
            ])
            let optionFrom =  el('option', index)
            let optionTo =  el('option', index)
            exchangeFrom.append(optionFrom)
            exchangeTo.append(optionTo)
            valutaDiv.append(pDiv)

        }
    }
   
   

     //шапка страницы
    const div = el('div',{class:'container main-container', id: 'div-field'},[
        el('div', {class: 'title-div check'}, [
            el('h2', {class:'h2 main-h2 list-reset'},'Валютный обмен'),   
        ]),       
        checkDiv,
    ])

    

    return {div,btn, invalidSum, invalidSumImg,
        validSumImg, input,exchangeFrom,exchangeTo,invalidAutorization}
}