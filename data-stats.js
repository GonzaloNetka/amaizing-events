let urlApi="https://mindhub-xj03.onrender.com/api/amazing"

let data ,totalEvents,pastEvents,upcomingEvents=[]
let categoriaFiltrada =[]

let porcentaje =[]
let minAssistence, maxAssistence 
let eventMinAssistence,eventMaxAssistence = {}

let mayorCapacidad =[]
let revenuesPast=[]
let asistenciaPasado=[]
let asistenciaPasadoTotal=[]
let contadorPast =[]

let revenuesUpcomings=[]
let asistenciaUpcomings=[]
let asistenciaUpcomingsTotal=[]
let contadorUpcomings=[]

async function traerDatos() {
  try{
    const response= await fetch(urlApi)
    const datos = await response.json()
    data = datos
    totalEvents = data.events.map(event => event)
    console.log(totalEvents)
    const tiempoActual = data.currentDate
    pastEvents = data.events.filter( pastEvent => pastEvent.date < tiempoActual)
    upcomingEvents = data.events.filter( upcomingEvent => upcomingEvent.date > tiempoActual)
    let arrayBusqueda = totalEvents.map(event => event.category)
    let filtroBusqueda = new Set(arrayBusqueda)
    categoriaFiltrada = Array.from(filtroBusqueda)
    
    mayorCapacidad = totalEvents.sort((a,b) => a.capacity - b.capacity)
    calculoPorcentaje()
    calculoRevenues(pastEvents)
    calculoRevenuesUpcomings(upcomingEvents)
    cargarStats1()
  }
  catch(error){
    console.log(error)
  }
}
traerDatos()


function cargarStats1(){
const tablaStats1 = document.getElementById('tabla-stats1')
// let container = document.querySelector("tbody")
let tableBodyHTML = "";

  tableBodyHTML += `
          <thead>
              <tr>
                <th colspan="3">Events statistic</th>
              </tr>
            </thead>
              
              <tr>
                <td><b>Events with the highest persentage of attendance</b></td>
                <td><b>Events with the lowest persentage of attendance</b></td>
                <td><b>Event with larger capacity</b></td>
              </tr>
              <tr>
                <td>${eventMaxAssistence.name}    ${maxAssistence} %</td>
                <td>${eventMinAssistence.name}    ${minAssistence} %</td>
                <td>${mayorCapacidad[mayorCapacidad.length-1].name}</td>
              </tr>
            `
  tableBodyHTML += `
          <thead>
            <tr>
              <th colspan="3">Past events statistic by category</th>
            </tr>
            <tr>
              <td><b>Categories</b></td>
              <td><b>Revenues</b></td>
              <td><b>Persentage of attendance</b></td>
            </tr>
          </thead>
          `
  for (let i=0; i<categoriaFiltrada.length; i++) {

      tableBodyHTML += `<tr>
      <td>${categoriaFiltrada[i]}</td>
      <td>${revenuesPast[i]}</td>
      <td>${asistenciaPasadoTotal[i]}</td>
      
      </tr>`
    }
  tableBodyHTML+=`
              <thead>
               <tr>
                 <th colspan="3">Upcoming events statistic by category</th>
               </tr>
               <tr>
                 <td><b>Categories</b></td>
                 <td><b>Revenues</b></td>
                 <td><b>Persentage of attendance</b></td>
               </tr>
              </thead>
  `
  for (let i=0; i<categoriaFiltrada.length; i++) {

    tableBodyHTML += `<tr>
    <td>${categoriaFiltrada[i]}</td>
    <td>${revenuesUpcomings[i]}</td>
    <td>${asistenciaUpcomingsTotal[i]}</td>
    
    </tr>
    `
  }
  
  // container.innerHTML = tableBodyHTML
  tablaStats1.innerHTML = tableBodyHTML
}
 

// FUNCION CALCULAR PORCENTAJE

function calculoPorcentaje(){
  minAssistence = (pastEvents[0].assistance * 100)/pastEvents[0].capacity
  maxAssistence = (pastEvents[0].assistance * 100)/pastEvents[0].capacity
for (let i = 0; i < pastEvents.length; i++){
  porcentaje = (pastEvents[i].assistance * 100)/pastEvents[i].capacity
  if (minAssistence > porcentaje){
    minAssistence = porcentaje
    eventMinAssistence = pastEvents[i]
  }
  if (maxAssistence < (pastEvents[i].assistance * 100)/pastEvents[i].capacity){
    maxAssistence = (pastEvents[i].assistance * 100)/pastEvents[i].capacity
    eventMaxAssistence = pastEvents[i]
  }
}

}

function calculoRevenues(array){
  for (let i = 0; i < categoriaFiltrada.length; i++){
    revenuesPast[i]=0
    asistenciaPasado[i]=0
    asistenciaPasadoTotal[i]=0
    contadorPast[i]=0
    for (let j = 0; j < array.length; j++){
      
      if (array[j].category == categoriaFiltrada[i]){

        contadorPast[i]++ 
        revenuesPast[i] = revenuesPast[i] + (array[j].price * array[j].assistance)
        asistenciaPasado[i] +=(array[j].assistance * 100)/array[j].capacity
      }
    }
    asistenciaPasadoTotal[i] = (asistenciaPasado[i]/contadorPast[i]).toFixed(2)
  }
}
function calculoRevenuesUpcomings(array){
  for (let i = 0; i < categoriaFiltrada.length; i++){
    revenuesUpcomings[i]=0
    asistenciaUpcomings[i]=0
    asistenciaUpcomingsTotal[i]=0
    contadorUpcomings[i]=0
    for (let j = 0; j < array.length; j++){
      
      if (array[j].category == categoriaFiltrada[i]){

        contadorUpcomings[i]++ 
        revenuesUpcomings[i] = revenuesUpcomings[i] + (array[j].price * array[j].estimate)
        asistenciaUpcomings[i] +=(array[j].estimate * 100)/array[j].capacity
      }
    }
    
    asistenciaUpcomingsTotal[i] = (asistenciaUpcomings[i]/contadorUpcomings[i]).toFixed(2)
  }
}

