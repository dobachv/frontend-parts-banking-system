import {el} from 'redom';


// создание основной страницы
 export function mainPage(){
    const checkDiv = el('div', {class: 'check-div', id:'check-div'})
    const div = el('div',{class:'container main-container', id: 'div-field'},[
        el('div', {class: 'title-div'}, [
            el('h2', {class:'h2 main-h2 list-reset'},'Ваши счета'),
            el('select', {class:'sort',id:'sort'}, [
               el('option', {style:'display:none'},   'Сортировка'),
                el('option', {id:'sort-number'}, 'По номеру'),
                el('option',{id:'sort-balance'},'По балансу'),
                el('option',{id:'sort-tr'},'По последней транзакции')
            ]),
            el('button', {class: 'btn main-btn', id: 'main-btn'}, '+ Создать новый счёт')
        ]),
        checkDiv
    ])

    return {div, checkDiv}
 }