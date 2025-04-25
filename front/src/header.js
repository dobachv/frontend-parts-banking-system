import {el} from 'redom'

export function header(){
    const body = document.getElementById('body')  
    const header = el('header',{ class:'header'},[
        el('div',{class:"container header-container"},[
            el('div',{ class:"header-logo" },[
                el('p',{ class: "logo list-reset"}," Coin.")
            ]),
            el('div', {class: "header-btn-div", id:"header-btn-div"},[
                el('button', {class:"header-btn header-btn-bank", id:"bank"},"Банкоматы"),
                el('button', {class:"header-btn header-btn-check" ,id:"check"},"Счета"),
                el('button', {class:"header-btn header-btn-valuta", id:"valuta"},"Валюта"),
                el('button', {class:"header-btn header-btn-exit", id:"exit"},"Выйти")
            ])
        ])
        
    ])
    body.prepend(header)
}