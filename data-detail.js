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
    let query =location.search
    let parametro = new URLSearchParams(query)
    console.log(parametro)
    let idparametro = parametro.get("id")
    console.log(idparametro)
    
    let tarjetaDetail = totalEvents.find(each => each._id == idparametro)
    console.log(tarjetaDetail)
    cargarDetail(tarjetaDetail)
  }
  catch(error){
    console.log(error)
  }
}
traerDatos()


// let query =location.search
// let parametro = new URLSearchParams(query)
// console.log(parametro)
// let idparametro = parametro.get("id")
// console.log(idparametro)

// let tarjetaDetail = totalEvents.find(each => each._id == idparametro)
// console.log(tarjetaDetail)

function cargarDetail(tarjetaDetail){
let html = ``;
const detalleASubir = document.getElementById("tarjeta-detail")

html += `
  <div class="card-detallada" style="width: 60rem;">
  <h2 class="card-title-detallada">${tarjetaDetail.name}</h2>
  <img src="${tarjetaDetail.image}" class="card-img-top detallada" alt="${tarjetaDetail.name}">
    <div class="card-body">
      
      <p class="card-text-detallada">${tarjetaDetail.description}</p>
      <p class="card-text-detallada">Date: ${tarjetaDetail.date}</p>
      <p class="card-text-detallada">Category: ${tarjetaDetail.category}</p>
      <p class="card-text-detallada">Place: ${tarjetaDetail.place}</p>
      <p class="card-text-detallada">Capacity: ${tarjetaDetail.capacity}</p>
      <p class="card-text-detallada">Assistance: ${tarjetaDetail.assistance}</p>
      <p class="card-text-detallada">Price: ${tarjetaDetail.price}</p>
    </div>
  </div>
  `;
  detalleASubir.innerHTML = html;
}
// cargarDetail(tarjetaDetail)


