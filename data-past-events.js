let urlApi="https://mindhub-xj03.onrender.com/api/amazing"
let data =[]
let totalEvents =[]
let pastEvents =[]
async function traerDatos() {
  try{
    const response= await fetch(urlApi)
    const datos = await response.json()
    data = datos
    totalEvents = data.events.map(event => event)
    console.log(totalEvents)
    const tiempoActual = data.currentDate
    let arrayBusqueda = totalEvents.map(event => event.category)
    let filtroBusqueda = new Set(arrayBusqueda)
    let busquedaFiltrada = Array.from(filtroBusqueda)
    pastEvents = data.events.filter( pastEvent => pastEvent.date < tiempoActual)
    cargarBusqueda(busquedaFiltrada)
    
    console.log(pastEvents)
    filtroCruzado()
    cargarTarjetas(pastEvents)
  }
  catch(error){
    console.log(error)
  }
}
traerDatos()

function filtroCruzado(){
  let texto = document.getElementById("id_texto").value
  let checks = Array.from (document.querySelectorAll(".capturarChecks:checked")).map(each => each.value)
  let filtro = pastEvents.filter(each =>{
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
  const tagToUpdate = document.getElementById("tarjetas-past");
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
// const tiempoActual = data.currentDate
// const pastEvents = data.events.filter( pastEvent => pastEvent.date < tiempoActual)

function cargarTarjetas(pastEvents){
  let body = ``;
  const tagToUpdate = document.getElementById("tarjetas-past");
  console.log("tagToUpdate", tagToUpdate);
  for(let i = 0; i < pastEvents.length; i++){
    body += `
    <div class="card" style="width: 18rem;">
      <img src="${pastEvents[i].image}"  class="card-img-top" alt= ${pastEvents[i].category}>
      <div class="card-body">
        <h5 class="card-title">${pastEvents[i].name}</h5>
        <p class="card-text">${pastEvents[i].description}</p>
        <a href="./detail-event.html?id=${pastEvents[i]._id}" class="btn btn-primary">See more</a>
      </div>
    </div>
    `;
  }
  tagToUpdate.innerHTML = body;
}
// cargarTarjetas(pastEvents)

// CREACION DE BUSQUEDA DINAMICAMENTE
// let arrayBusqueda = totalEvents.map(event => event.category)
// let filtroBusqueda = new Set(arrayBusqueda)
// let busquedaFiltrada = Array.from(filtroBusqueda)

function cargarBusqueda(busquedaFiltrada) {
  let html = ``;
  const elementoBusqueda = document.getElementById("busqueda");
  // console.log(elementoBusqueda);
  html += `<input onkeyup="filtroCruzado()" id="id_texto" type="text" name="cajaBusqueda" size="22" placeholder="Search">`
  for (let i = 0; i < busquedaFiltrada.length; i++) {
    html += `
    <div class="form-check form-check-inline">
      <input onclick="filtroCruzado()" class="form-check-input capturarChecks" type="checkbox" name="${busquedaFiltrada[i]}" id="${busquedaFiltrada[i]}" value="${busquedaFiltrada[i]}">
      <label class="form-check-label" for="${busquedaFiltrada[i]}">${busquedaFiltrada[i]}</label>
    </div>
    `;
  }
    
  elementoBusqueda.innerHTML = html;
}
// cargarBusqueda(busquedaFiltrada)