import Card from './card.js'
import { currentDate } from './function.js'


// создание поля с картами
export function createCards(a, fieldCards, main,token) {
    let resultDate;
    let arrayCard = []
    fieldCards.innerHTML = ''
    for ( let i = 0; i<a.length; i++){         
        const j = a[i].transactions.length-1
        if (a[i].transactions.length === 0){
            resultDate = 'Нет транзакций'
        } else {
            resultDate = currentDate(a[i].transactions[j].date)
        }
        arrayCard.push(new Card(a[i].account, a[i].balance, resultDate,fieldCards, main, token).checkCreate())    
           
    } 
    return arrayCard
}
