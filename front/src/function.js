// запись даты
export function currentDate(obj){
     let date = new Date (obj)
     const year = date.getFullYear();
     const day = date.getDate();
     const month = date.getMonth();

     let monthText
     if (month == '0') monthText = 'января'
     else {
        if (month == '1') monthText = 'февраля'
        else {
             if (month == '2') monthText = 'марта'
             else{
                if (month == '3') monthText = 'апреля'
                else{
                    if (month == '4') monthText = 'мая'
                    else{
                        if (month == '5') monthText = 'июня'
                        else {
                            if (month == '6') monthText = 'июля'
                            else{
                                if (month == '7') monthText = 'августа'
                                 else {
                                    if (month == '8') monthText = 'сентября'
                                    else{
                                        if (month == '9') monthText = 'октября'
                                        else{
                                            if (month == '10') monthText = 'ноября'
                                            else{
                                                if (month == '11') monthText = 'декабря'
                                            }
                                        }
                                    }
                                 }
                            }
                        }
                    }
                }
             }

        }
     }

    let resultData = day + ' ' + monthText + ' ' + year
     return resultData

}
// запись даты обратная
export function currentMonthOb(obj){
    const month1 = obj
    let monthText
    if (month1 == 'янв') monthText = '01'
    else {
       if (month1 == 'фев') monthText = '02'
       else {
            if (month1 == 'мар') monthText = '03'
            else{
               if (month1 == 'апр') monthText = '04'
               else{
                   if (month1 == 'май') monthText = '05'
                   else{
                       if (month1 == 'июн') monthText = '06'
                       else {
                           if (month1 == 'июл') monthText = '07'
                           else{
                               if (month1 == 'авг') monthText = '08'
                                else {
                                   if (month1 == 'сен') monthText = '09'
                                   else{
                                       if (month1 == 'окт') monthText = '10'
                                       else{
                                           if (month1 == 'ноя') monthText = '11'
                                           else{
                                               if (month1 == 'дек') monthText = '12'
                                           }
                                       }
                                   }
                                }
                           }
                       }
                   }
               }
            }

       }
    }   

    return monthText

}

export function currentMonthYear(obj){
    let date1 = new Date (obj)
    const month1 = date1.getMonth();
    const year = date1.getFullYear();

    let monthText
    if (month1 == '0') monthText = 'янв'
    else {
       if (month1 == '1') monthText = 'фев'
       else {
            if (month1 == '2') monthText = 'мар'
            else{
               if (month1 == '3') monthText = 'апр'
               else{
                   if (month1 == '4') monthText = 'май'
                   else{
                       if (month1 == '5') monthText = 'июн'
                       else {
                           if (month1 == '6') monthText = 'июл'
                           else{
                               if (month1 == '7') monthText = 'авг'
                                else {
                                   if (month1 == '8') monthText = 'сен'
                                   else{
                                       if (month1 == '9') monthText = 'окт'
                                       else{
                                           if (month1 == '10') monthText = 'ноя'
                                           else{
                                               if (month1 == '11') monthText = 'дек'
                                           }
                                       }
                                   }
                                }
                           }
                       }
                   }
               }
            }

       }
    }

    let resultData = monthText + ' ' + year

    return resultData

}

export function saveToLocalStroge(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  }
// подсчет данных для графика за n  месяцев
export function chartArray(account, arr, mont){
        
    const sixMonthArray = arr   
    // в дате только месяц и год
    sixMonthArray.forEach (obj => obj.month = currentMonthYear(obj.month)) 
    // Обьединяем объекты с одинаковыми месяцами и годами           
    let holder = {};
    //складываем баланс по месяцам
    for (let i = 0; i<sixMonthArray.length; i++){
        if (holder.hasOwnProperty(sixMonthArray[i].month)){
            if(sixMonthArray[i].to===account){
                holder[sixMonthArray[i].month] = holder[sixMonthArray[i].month] + sixMonthArray[i].bl;
            } else {  holder[sixMonthArray[i].month] = holder[sixMonthArray[i].month] - sixMonthArray[i].bl;}
        } else { if(i === 0){            
                holder[sixMonthArray[i].month] =  sixMonthArray[i].bl;
        } else{
            if(sixMonthArray[i].to===account){
                holder[sixMonthArray[i].month] =  holder[sixMonthArray[i-1].month] + sixMonthArray[i].bl;
            } else{
                holder[sixMonthArray[i].month] =  holder[sixMonthArray[i-1].month] - sixMonthArray[i].bl;
            }
        }
                }
    }

    let sixMonthArrayRez = [];
    for (let prop in holder) {
    sixMonthArrayRez.push({ month: prop, bl: holder[prop] });
    }
    // переводим дату обратно
    sixMonthArrayRez.forEach(function(d){
        d.month = d.month.replace(/\s/g,'')
        const mont =currentMonthOb(d.month.substring(0,3))
        const year = d.month.substring(3)
        const data = year+'-'+mont+'-01T00:00:00.000Z'
        d.month = new Date(data).toISOString()
    })
    //сегоднешний день
    let dataCurrent = new Date()
    dataCurrent.setMonth(-mont) // полгода назад
    // ищем только последние 6 месяцев
    sixMonthArrayRez = sixMonthArrayRez.filter(word => word.month > dataCurrent.toISOString())
    //в дате только месяц
    sixMonthArrayRez.forEach (obj => obj.month = currentMonthYear(obj.month).substring(0,3)) 
    //ищем макс. баланс
    let rez
    if(sixMonthArrayRez.length === 0){
        rez = '';
    } else{
        const maxRez = sixMonthArrayRez.reduce((acc, curr) => acc.bl > curr.bl ? acc: curr)
        rez = Math.round(maxRez.bl)
    }
    return {sixMonthArrayRez, rez}
}

// подсчет данных для цветного графика  за n  месяцев
export function chartArrayColor(account, arr, mont,arrRez){
        
    const sixMonthArray = arr   
    // в дате только месяц и год
    sixMonthArray.forEach (obj => obj.month = currentMonthYear(obj.month)) 
    // Обьединяем объекты с одинаковыми месяцами и годами           
    let holder = {};
    let holder2 = {}; 

    //объект исходящих транзакций
    sixMonthArray.forEach(function(d) {
        if (holder.hasOwnProperty(d.month)) {
            if(d.from===account){
                holder[d.month] = holder[d.month] + d.bl;
            }
        } else {
            if(d.from===account)
            {holder[d.month] = d.bl;}            
        }        
    });

    let sixMonthArrayRez1 = [];
    for (let prop in holder) {
    sixMonthArrayRez1.push({ month: prop, from: holder[prop] });
    }

    //объект входящих транзакций
    sixMonthArray.forEach(function(d) {
        if (holder2.hasOwnProperty(d.month)) {
            if(d.to===account){
                holder2[d.month] = holder2[d.month] + d.bl;
            }
        } else {
            if(d.to===account)
            {holder2[d.month] = d.bl;}            
        }        
    });    

    let sixMonthArrayRez2 = [];
    for (let prop in holder2) {
        sixMonthArrayRez2.push({ month: prop, to: holder2[prop] });
        }

   // объединяем массивы
   let sixMonthArrayRez3 = sixMonthArrayRez1.concat(sixMonthArrayRez2)
   let sixMonthArrayRez = []
        for( let ob of sixMonthArrayRez3){
            if(!sixMonthArrayRez.find(o => o.month===ob.month)){
                sixMonthArrayRez.push(sixMonthArrayRez3.filter(o => o.month===ob.month).reduce((acc, val) =>{
                    return{...acc, ...val }
                }))
            }
        }
    
    // переводим дату обратно
    sixMonthArrayRez.forEach(function(d){
        d.month = d.month.replace(/\s/g,'')
        const mont =currentMonthOb(d.month.substring(0,3))
        const year = d.month.substring(3)
        const data = year+'-'+mont+'-01T00:00:00.000Z'
        d.month = new Date(data).toISOString()
    })
    //сегоднешний день
    let dataCurrent = new Date()
    dataCurrent.setMonth(-mont) // полгода назад
    // ищем только последние 6 месяцев
    sixMonthArrayRez = sixMonthArrayRez.filter(word => word.month > dataCurrent.toISOString())
    //в дате только месяц
    sixMonthArrayRez.forEach (obj => obj.month = currentMonthYear(obj.month).substring(0,3)) 
     
    // объединяем массивы
    sixMonthArrayRez = sixMonthArrayRez.reduce((arr, e) => {
        arr.push(Object.assign({}, e, arrRez.find(a => a.month == e.month)))
        return arr
    },[])

    sixMonthArrayRez.forEach(function(d) {
        let pr
        let to = (d.hasOwnProperty('to')) ? d.to : 0
        let from = (d.hasOwnProperty('from')) ? d.from : 0
        if (d.hasOwnProperty('from')){
             pr= 100 * d.from / (d.from + d.to)  
        } else  pr = 0
        d.blFrom = pr / 100 * d.bl
        d.pr = pr   
        d.sum = from + to
        
    });     
    let middleRez
    //ищем макс. баланс
    let rez
    if(sixMonthArrayRez.length === 0){
        rez = '';
        middleRez = ''
    } else{
        const maxRez = sixMonthArrayRez.reduce((acc, curr) => acc.sum > curr.sum ? acc: curr)
        rez = Math.round(maxRez.sum)

        // ищем макс. сркди мин.
        let totalTo = 0, totalFrom = 0
        for (let i =  0; i < sixMonthArrayRez.length; i++ ){
            let totalFromI = (sixMonthArrayRez[i].hasOwnProperty('from')) ? sixMonthArrayRez[i].from : 0
            let totalToI = (sixMonthArrayRez[i].hasOwnProperty('to')) ? sixMonthArrayRez[i].to : 0
            totalTo = totalTo + totalToI
            totalFrom = totalFrom +totalFromI
        }
     
        if (totalTo < totalFrom){
            middleRez = 0
            for (let i = 0; i< sixMonthArrayRez.length; i++){
                let index = (sixMonthArrayRez[i].hasOwnProperty('to')) ? sixMonthArrayRez[i].to : 0
                middleRez = (middleRez< index)? index : middleRez
            }
        } else {
            middleRez = 0
            for (let i = 0; i< sixMonthArrayRez.length; i++){
                let index = (sixMonthArrayRez[i].hasOwnProperty('from')) ? sixMonthArrayRez[i].from : 0
                middleRez = (middleRez< index)? index : middleRez
            }
        }        
    }

    return {sixMonthArrayRez, rez,middleRez}
}

export function preloader(){   
    let preloader = document.getElementById('preloader');
   
    if(preloader.classList.contains('preloader-hidden')){
       preloader.classList.remove('preloader-hidden')   }
        window.addEventListener('load', ()=>{
        preloader.classList.add('preloader-hidden')
    }) 

}
