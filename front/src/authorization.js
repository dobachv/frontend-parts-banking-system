import {setChildren } from 'redom'
import {login} from './login.js'
import User from './api.js'
import { validatorLogin} from './validator.js'
import { fieldCard } from "./field-cards.js"
import { formExchange } from './form-exchange.js'
import {lookBank} from './look-bank.js'
import href1 from "./index.js"
import { exitPage } from "./exit"



export async function autorization(){
    const main = document.getElementById('main')  
    const loginDom = login()      
  
    setChildren(main, loginDom.div)

    const patternLogin = /^[\S]+$/;
    const validationStates = {
        login: false,
        password: false
    }; 

    // активность кноприки "Вход"
    loginDom.btn.disabled = true;
    function updateButtonState() {
        loginDom.btn.disabled = !Object.values(validationStates).every(Boolean);
        if (loginDom.btn.disabled){
            loginDom.btn.style.background = '#4B5563'
        } else {
            loginDom.btn.style.background = '#116ACC'
        }
    }
    updateButtonState() 

    //валидация формы авторизации
    loginDom.inputLogin.addEventListener('keyup', event => {
    validationStates.login = validatorLogin (patternLogin, loginDom.inputLogin, event,loginDom.invalidLogin,
    loginDom.invalidLoginImg, loginDom.validLoginImg)
    updateButtonState()
    })

    loginDom.inputPassword.addEventListener('keyup', event => {
    validationStates.password = validatorLogin (patternLogin, loginDom.inputPassword, event,loginDom.invalidPassword,
        loginDom.invalidPasswordImg, loginDom.validPasswordImg )
    updateButtonState()
    })

//Авторизация 
    loginDom.btn.addEventListener('click', async event =>{
        event.preventDefault(); 
        let WorkApi = new User()  
        let autorization = await WorkApi.constructor.autorization(loginDom.inputLogin.value, loginDom.inputPassword.value)
        let bank = await WorkApi.constructor.getBank()     

        //отображение карты
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });
            if(bank.payload.length>0){
                for (let i=0; i<bank.payload.length; i++ ){
                    let myPlacemark = new ymaps.Placemark([bank.payload[i].lat, bank.payload[i].lon]);
                    myMap.geoObjects.add(myPlacemark);
                }
            }
        }   
   
   
        // проверка на верный пароль 
    if(autorization.error === 'Invalid password'){
        loginDom.invalidAutorization.style.opacity = '1'
        loginDom.invalidAutorization.textContent = 'Неверный пороль'
        loginDom.invalidAutorization.style.color = '#EB5757'
    }
        else {
            if((autorization.error === 'No such user')){
            loginDom.invalidAutorization.style.opacity = '1'
                loginDom.invalidAutorization.textContent = 'Пользователя с таким логином не существует'
                loginDom.invalidAutorization.style.color = '#EB5757'
            } else {
                loginDom.invalidAutorization.style.opacity = '0'
                document.getElementById('header-btn-div').classList.add('open')       
                fieldCard(autorization.payload.token)
                history.pushState(null,"", 'page');  
            }
        }

        //кнопка счета
        const check = document.getElementById('check')
        check.addEventListener('click', async () => {        
            history.pushState(null,"", 'page');            
            fieldCard(autorization.payload.token)
        })
        //кнопка валюта
        const valuta = document.getElementById('valuta')
        valuta.addEventListener('click', async () => {
            history.pushState(null,"", 'valuta');
            formExchange(autorization.payload.token)
        })

        //кнопка карта
        const bank1 = document.getElementById('bank')
        bank1.addEventListener('click', async () => {
            history.pushState(null,"", 'ATMs');
            lookBank();
            ymaps.ready(init);
        })
   
        historia   
        window.addEventListener("popstate", (event) => {
            const mark = document.getElementById('header-btn-div').classList.contains('open') 
        
            if (!mark) {
                history.pushState(null,"", href1); 
                return
            }
                else{
                    let currUrl = document.location.href 
                     if(currUrl === href1+'page'){               
                       fieldCard(autorization.payload.token)
                     } 
                    if(currUrl === href1+'valuta'){                    
                        formExchange(autorization.payload.token)
                    }
                    if(currUrl === href1+'ATMs'){                    
                        lookBank();
                        ymaps.ready(init);
                    }
                    if(currUrl === href1){  
                        exitPage();
                    }  
                }  
            })   
    
    })
     
    //кнопка выхода            
    const exit = document.getElementById('exit')
    exit.addEventListener('click', () =>{      
        exitPage();        
    })

     
}
