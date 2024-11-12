
function obtenerFotos(consulta) {
  const apiUrl = `https://images-api.nasa.gov/search?q=${consulta}`;

  fetch(apiUrl)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error('¡Ups! Algo salió mal al buscar las fotos');
      }
      return respuesta.json();
    })
    .then((info) => {
      mostrarImagenes(info.collection.items);
    })
    .catch((error) => {
      console.error('¡Error en la solicitud!', error);
    });
}

//Se muestran los resultados
function mostrarImagenes(...info) { 
  const contenedorDeFotos = document.getElementById('resultados');
  contenedorDeFotos.innerHTML = ''; // Se limpian las busquedas

  //
  info[0].forEach((foto) => {
    const detallesDeLaFoto = { ...foto.data[0] }; 

    const { title: nombre, description: detalle, date_created: fecha } = detallesDeLaFoto;
    const urlDeImagen = foto.links[0].href;

    // Para mostrar la informaci'on en tarjetas
    const tarjeta = `
      <div class="col-md-4 d-flex align-items-stretch">
        <div class="card mb-4 shadow-sm d-flex flex-column">
          <img src="${urlDeImagen}" class="card-img-top img-fluid w-100" alt="" style="height: 150px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text text-start flex-grow-1 scroll">${detalle}</p>
            <p class="card-text mt-auto"><small class="text-muted">${new Date(fecha).toLocaleDateString()}</small></p>
          </div>
        </div>
      </div>
    `;

    contenedorDeFotos.innerHTML += tarjeta;
  });
}

document.getElementById('buscarBtn').addEventListener('click', () => {
  const textoBusqueda = document.getElementById('textoDeBusqueda').value;

  if (textoBusqueda.trim() !== '') {
    obtenerFotos(textoBusqueda);
  }
});

