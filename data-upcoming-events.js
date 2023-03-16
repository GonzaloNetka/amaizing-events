const tiempoActual = data.currentDate

// let pastEvents=[]
// let upcomingsEvents=[]
// console.log(tiempoActual)

// for(let i = 0; i < data.events.length; i++){
// if (tiempoActual > data.events[i].date){
//   pastEvents.push(data.events[i])
//   // console.log("evento", data.events[i].name , "es pasado")
//   // console.log(data.events[i].date)
// }else {
//   upcomingsEvents.push(data.events[i])
//   // console.log("evento", data.events[i].name , "es futuro")
//   // console.log(data.events[i].date)
// }
// }
// console.log("eventos pasados",pastEvents)
function filtroCruzado(){
  let texto = document.getElementById("id_texto").value
  let checks = Array.from (document.querySelectorAll(".capturarChecks:checked")).map(each => each.value)
  let filtro = totalEvents.filter(each =>{
  return (
    each.name.toLowerCase().includes(texto.toLowerCase())
  ) && (
    checks.length === 0 ||checks.includes(each.category)
    )
  })
  if(filtro.length > 0){
    cargarTarjetas(filtro)
  } else {
    tarjetaNoEncontrada()
  }
    
}
function tarjetaNoEncontrada(){
  let body = ``;
  const tagToUpdate = document.getElementById("tarjetas-upcomings");
  body += `
    <div class="card" style="width: 18rem;">
      <img src="" class="card-img-top" alt= "foto not found">
      <div class="card-body">
        <h5 class="card-title">Event not found</h5>
      </div>
    </div>
    `;
  
  tagToUpdate.innerHTML = body;
}
const upcomingsEvents = data.events.filter( upcomingEvent => upcomingEvent.date >= tiempoActual)

function cargarTarjetas(upcomingsEvents){
let body = ``;
const tagToUpdate = document.getElementById("tarjetas-upcomings");
console.log("tagToUpdate", tagToUpdate);
for(let i = 0; i < upcomingsEvents.length; i++){
  body += `
  <div class="card" style="width: 18rem;">
    <img src="${upcomingsEvents[i].image}"  class="card-img-top" alt= ${upcomingsEvents[i].category}>
    <div class="card-body">
      <h5 class="card-title">${upcomingsEvents[i].name}</h5>
      <p class="card-text">${upcomingsEvents[i].description}</p>
      <a href="./detail-event.html?id=${upcomingsEvents[i]._id}" class="btn btn-primary">See more</a>
    </div>
  </div>
  `;
}
tagToUpdate.innerHTML = body;
}
cargarTarjetas(upcomingsEvents); 