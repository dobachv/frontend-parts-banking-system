export function validatorLogin (pattern, input,event,label,
   invalid, valid ){
    let rez = false
    
     if (input.value.length > 5 && pattern.test(input.value) ){
      label.style.display = 'block'
      input.style.border = '1px solid #76CA66'
      label.textContent = 'Готово'
      label.style.color = '#76CA66'
      valid.style.opacity = '1'
      invalid.style.opacity = '0'
      rez = true
     } else{
      label.classList.add('open')
        input.style.border = '1px solid #EB5757'
        label.textContent = 'Не менее 6 символов и пробелы не допустимы'
        label.style.color = '#EB5757'
        invalid.style.opacity = '1'
        valid.style.opacity = '0'
        rez = false
     }
     return rez
}

export function validatorTransfor(input,label,valid,invalid,text){
   let rez = false;
   const pattern = /\D/

   if (pattern.test(input.value || input.value=='') ){
      label.classList.add('open')
      input.style.border = '1px solid #EB5757'
      label.textContent = text
      label.style.color = '#EB5757'
      invalid.style.opacity = '1'
      valid.style.opacity = '0'
      rez = false
     } else{
      label.style.display = 'block'     
         input.style.border = '1px solid #76CA66'
         label.textContent = 'Готово'
         label.style.color = '#76CA66'
         valid.style.opacity = '1'
         invalid.style.opacity = '0'
         rez = true
     }

   return rez;
}