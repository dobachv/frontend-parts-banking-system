import {el,setChildren} from 'redom';
import User from './api.js'

export function lookBank(){
    const main = document.getElementById('main')   
    main.innerHTML='';
    let preloader = document.getElementById('preloader');
    if(preloader.classList.contains('preloader-hidden')){
        preloader.classList.remove('preloader-hidden')   }
        
    const checkDiv = el('div', {class: 'bank-div', id:'map'})

    //шапка страницы
    const div = el('div',{class:'container main-container', id: 'div-field'},[
    el('div', {class: 'title-div check'}, [
        el('h2', {class:'h2 main-h2 list-reset'},'Карта банкоматов'),   
    ]),       
    checkDiv,
    ])


    setChildren(main,div)
    preloader.classList.add('preloader-hidden')
}
