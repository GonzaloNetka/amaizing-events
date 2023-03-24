
let urlApi="https://mindhub-xj03.onrender.com/api/amazing"
let data =[]
let totalEvents =[]
async function traerDatos() {
  try{
    const response= await fetch(urlApi)
    const datos = await response.json()
    data = datos
    totalEvents = data.events.map(event => event)
    console.log(totalEvents)
    let arrayBusqueda = totalEvents.map(event => event.category)
    let filtroBusqueda = new Set(arrayBusqueda)
    let busquedaFiltrada = Array.from(filtroBusqueda)
    cargarBusqueda(busquedaFiltrada)
    console.log(busquedaFiltrada)
    filtroCruzado()
    cargarTarjetas(totalEvents)
  }
  catch(error){
    console.log(error)
  }
}
traerDatos()

// CREACION DE FILTROS
// const input = document.querySelector("input")
// console.log(input)
// input.addEventListener("input",() => {
// let arrayFiltradoTexto = filtrarTexto(totalEvents,input.value)
// if (arrayFiltradoTexto != 0){
//   cargarTarjetas(arrayFiltradoTexto)
// } else{
//   tarjetaNoEncontrada()
// }
// }
// )
// function filtrarTexto(array, texto){
// let arrayFiltrado = array.filter(each => each.name.toLowerCase().includes(texto.toLowerCase()))
// console.log(arrayFiltrado)
//   return arrayFiltrado
// }


// function filtrarPorCategoria(array){
//   let checks = document.querySelectorAll("input[type=checkbox]")
//   let arrayChecks = Array.from(checks)
//   let arrayFiltrado = arrayChecks.filter(each => each.checked)
//   if(arrayFiltrado.length == 0){
//     return cargarTarjetas(array)
//   }
//   let arrayFiltradoValue = arrayFiltrado.map(each => each.value)
//   let filtradoFinal = array.filter(each => arrayFiltradoValue.includes(each.category))
//   cargarTarjetas(filtradoFinal)
// }

function filtroCruzado(){
  let texto = document.getElementById("id_texto").value
  let checks = Array.from (document.querySelectorAll(".capturarChecks:checked")).map(each => each.value)
  // console.log(texto)
  // console.log(checks)
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
// CREACION TARJETAS DINAMICAMENTE

function cargarTarjetas(arrayEvents){
    let body = ``;
    const tagToUpdate = document.getElementById("tarjetas-main");
    // console.log("tagToUpdate", tagToUpdate);
    for(let i = 0; i < arrayEvents.length; i++){
      body += `
      <div class="card" style="width: 18rem;">
        <img src="${arrayEvents[i].image}" class="card-img-top" alt= ${arrayEvents[i].category}>
        <div class="card-body">
          <h5 class="card-title">${arrayEvents[i].name}</h5>
          <p class="card-text">${arrayEvents[i].description}</p>
          <a href="./detail-event.html?id=${arrayEvents[i]._id}" class="btn btn-primary">See more</a>
        </div>
      </div>
      `;
    }
    tagToUpdate.innerHTML = body;
  }
  // cargarTarjetas(totalEvents) 

  function tarjetaNoEncontrada(){
    let body = ``;
    const tagToUpdate = document.getElementById("tarjetas-main");
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