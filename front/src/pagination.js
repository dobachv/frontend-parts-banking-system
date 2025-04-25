import {el} from 'redom';
import { historyTr } from './look-balance';



export default class Card{
    
    constructor(number,array,account, container){
        this.number = number
        this.account= account
        this.array =array
        this.container = container
    }
     paginationCreate(){  
        const btn = el('button', {class: 'btn pagin-btn '}, this.number)   
        
          // переключение страницы
         btn.addEventListener('click', async ()=>{
            this.container.innerHTML=''
            historyTr(this.array,this.array.length - (this.number-1)*25, (this.array.length - (this.number-1)*25)-26,this.account, this.container)
         })
        return btn;
    } 

 
    
}
