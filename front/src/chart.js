import Chart from 'chart.js/auto'
 
export function chartCreat(el, arr,){

  new Chart(                
        el,
        {
          type: 'bar',
          data: {
            labels: arr.map(row => row.month),
            datasets: [
              {
                data: arr.map(row => row.bl)
              }
            ],
             
          },
          options: {
            responsive: true,
            maintainAspectRatio:false,

            scales: {                        
                y: {
                    display: false ,
                    grid:{
                        display: false
                    }
                    
                },
                x: {
                    grid:{
                       display: false
                    },
                    border:{
                        color: 'white'
                    }
                },
                
                                                           
            },
            plugins: {
                legend: {                            
                   display: false
                }
             }                                         
        },
        }
      );

}

export function chartCreatColor(el, arr,){
  new Chart(                
        el,
        {
          type: 'bar',
          data: {
            labels: arr.map(row => row.month),
            datasets: [
              {
                data: arr.map(row => row.sum),
                backgroundColor: '#76CA66',
                order:1

              },
              {
                data: arr.map(row => row.from),
                backgroundColor: '#FD4E5D',
                order: 0
              }
            ],
             
          },
          options: {
            responsive: true,
            maintainAspectRatio:false,

            scales: {                        
                y: {
                    display: false ,
                    grid:{
                        display: false
                    }
                    
                },
                x: {
                  stacked:true, 
                    grid:{
                       display: false
                    },
                    border:{
                        color: 'white'
                    }
                },
                
                                                           
            },
            plugins: {
                legend: {                            
                   display: false
                }
             }                                         
        },
        }
      );

}