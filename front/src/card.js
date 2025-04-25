import {el} from 'redom';
import { lookCard } from './look-card.js';
import {preloader} from "./function.js"
import href1 from "./index.js"


export default class Card{
    
    constructor(account,balance,data,container, containerMain,token){
        this.account = account
        this.balance = balance
        this.data = data
        this.container = container
        this.containerMain = containerMain
        this.token = token
    }
     checkCreate(){          
        const btn = el('button', {class: 'btn card-btn'},'Открыть')   
        const card = el('div', {class: 'card-div'},[
            el('div', {class: 'number-div'}, [
                el('p', {class: 'number-p list-reset'}, this.account),
                el('p', {class: 'balance list-reset'}, this.balance + '  ₽')
            ]),
            el('div',{class: 'trans-btn-div'},[
                el('div', {class:'trans-div'} ,[
                    el('p', {class: 'trans-p list-reset'},'Последняя транзакция:'),
                    el('p',{class: 'trans-data list-reset'},this.data)
                ]),
                btn           
            ])
        ])
         this.container.append(card)
         
          // просмотр счета
         btn.addEventListener('click', async ()=>{            
           history.pushState(null,"", this.account);
           lookCard(this.account,this.token,this.balance)
           preloader()
            
        window.addEventListener("popstate", (event) => {
            let currUrl = document.location.href 
            const mark = document.getElementById('header-btn-div').classList.contains('open')    
            if(!mark) {
                history.pushState(null,"", href1); 
                return}
                else {
                if(currUrl === href1+this.account){                    
                    lookCard(this.account,this.token,this.balance)
                    preloader()
                } 
            }           
        })

    })
        return card;
    } 
    
}
