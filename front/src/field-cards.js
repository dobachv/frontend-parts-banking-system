import User from './api.js'
import { createCards } from './check-creat.js' 
import {mainPage} from './main-page.js'
import {setChildren} from 'redom';


export async function  fieldCard(token){
    let WorkApi = new User()  
    const main = document.getElementById('main')
    main.innerHTML=''
    
    let preloader = document.getElementById('preloader');  
    if(preloader.classList.contains('preloader-hidden')){
        preloader.classList.remove('preloader-hidden')   }
    let a = await WorkApi.constructor.getAccounts(token)          
    const mainContainer =  mainPage(); 
    //создания поля с картами        
    setChildren(mainContainer.checkDiv,createCards(a.payload,mainContainer.checkDiv,mainContainer.div,token))    
    setChildren(main, mainContainer.div)
    
    //кнопка создать карту
    document.getElementById('main-btn').addEventListener('click', async () => {
    await WorkApi.constructor.createAccount(token)
    let b = await WorkApi.constructor.getAccounts(token)
    setChildren(mainContainer.checkDiv,createCards(b.payload,mainContainer.checkDiv,mainContainer.div,token))                 
    })


    document.getElementById('sort').addEventListener('change', async()=>{
        let array = await WorkApi.constructor.getAccounts(token)
        let value = document.getElementById('sort').value
        if (value ==='По номеру'){       
            array.payload.sort(function(a, b){
            let accountA=a.account.toLowerCase(), accountB=b.account.toLowerCase()
            if (accountA < accountB) //сортируем строки по возрастанию
              return -1
            if (accountA > accountB)
              return 1
            return 0 // Никакой сортировки
            })
            mainContainer.checkDiv.innerHTML=''  
            setChildren(mainContainer.checkDiv,createCards(array.payload,mainContainer.checkDiv,mainContainer.div,token))    
        }
             if( value === 'По балансу'){
                array.payload.sort(function(a, b){
                    return b.balance-a.balance
                  })
                mainContainer.checkDiv.innerHTML=''  
                setChildren(mainContainer.checkDiv,createCards(array.payload,mainContainer.checkDiv,mainContainer.div,token))    
             } else{
                if( value === 'По последней транзакции'){
                    array.payload.sort(function(a, b){

                        let dateA = (a.transactions.length === 0) ? '0000-01-00T00:00:00.000Z': new Date(a.transactions[0].date)
                        let dateB = (b.transactions.length === 0) ? '0000-01-00T00:00:00.000Z': new Date(b.transactions[0].date)
                        return dateB-dateA //сортировка по возрастающей дате
                        })
                    mainContainer.checkDiv.innerHTML=''  
                    setChildren(mainContainer.checkDiv,createCards(array.payload,mainContainer.checkDiv,mainContainer.div,token))    
                 }
             }
    })
    preloader.classList.add('preloader-hidden')

}