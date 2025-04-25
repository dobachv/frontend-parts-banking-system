import {el} from 'redom';
import error  from './assets/images/error.png'
import success  from './assets/images/success.png'


export function login() {
    
    const inputLogin = el('input', {class: 'form-input',placeholder: 'Введите логин', type: 'text', id:'login'})
    const inputPassword =  el('input', {class: 'form-input',placeholder: 'Введите пароль', type: 'text',id:'password'})
    const btn = el('button', {class: 'login-btn btn', type: 'submit'}, 'Войти')
    const invalidLogin = el('p', {class: "login-invalid invalid"}, '')
    const invalidPassword =  el('p', {class: "password-invalid invalid"}, '' )
    const invalidAutorization =  el('p', {class: "avtorezation-invalid"}, '' )
    const invalidLoginImg = el('img', {class:'login-img-inval', src: error})
    const validLoginImg = el('img', {class:'login-img-val', src: success})
    const invalidPasswordImg = el('img', {class:'password-img-inval', src: error})
    const validPasswordImg = el('img', {class:'password-img-val', src: success})

    const div =  el('div',{class: 'login-container'}, [
            el('h2', {class: 'h2 login-h2 list-reset'}, 'Вход в аккаунт'),
            el('form', {class: 'form-div'},[
                el('div',{class: 'form-block'},[
                    el('label',{class: 'form-label'}, 'Логин'),
                    inputLogin,
                    invalidLogin,
                    invalidLoginImg,
                    validLoginImg
                ]),
                el('div',{class: 'form-block'},[
                    el('label',{class: 'form-label'}, 'Пароль'),
                    inputPassword,
                    invalidPassword, 
                    invalidPasswordImg,
                    validPasswordImg
                ]),
                btn,
                invalidAutorization 
            ])
        ]) 
        
    return {div,inputLogin,inputPassword,btn,invalidLogin,
            invalidPassword,invalidAutorization,
            invalidLoginImg, invalidPasswordImg,
            validLoginImg,validPasswordImg  }
} 