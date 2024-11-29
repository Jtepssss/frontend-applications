//importar metodos de la api.js
import {
  getEssence,
  getEssencebyId,
  updateEssence,
  deleteEssence,
} from "./api";

document.addEventListener("DOMContentLoaded", async () => {
  const essenceList = document.getElementById("essence-list");

  const essences = await getEssence();
  essenceList.innerHTML = essences.map((essence) => `
          <div class="col-xs-12 col-sm-6 col-md-3 card">
            <div class="card-body d-flex flex-column justify-content-end">
              <h5 class="card-title">${essence.NombreDelProducto}</h5>
              <p class="card-text">${essence.Precio}</p> 
              <a onclick="viewEssence(${essence.CodigoDelProducto})" class_btn btn-primary">ver mas</a>
              </div>
            </div>
        `).join('');
});

//metodo para ver los detalles del producto cuando damos click en el boton ver mas

window.viewEssence = async (CodigoDelProducto) => {
  const essence = await getEssencebyId(CodigoDelProducto);
  const essenceDetails = `
    <div class="col">
      <h3>${essence.NombreDelProducto}</h3>
      <p>${essence.DetalleDelProducto}</p>
      <p>Precio: ${essence.Precio}</p>
      <button class="btn btn-warning" onclick="enableEdit(${essence.CodigoDelProducto})">Editar</
      button>  
      <button class="btn btn-danger" onclick="deleteEssence(${essence.CodigoDelProducto})">Eliminar</
      button>
     </div>   
  `;
  document.getElementById("essence-list").innerHTML = essenceDetails;
};

//Crear la vista para editar la informacion
window.enableEdit = async (CodigoDelProducto) => {
  const essence = await getEssencebyId(CodigoDelProducto);
  const editForm = `
    <div class="row gap-3">
      <input type="text" id="NombreDelProducto" value=${essence.NombreDelProducto}
      <textarea id="DetalleDelProducto">${essence.DetalleDelProducto}</textarea>
      <input type="number" id="Precio" value=${essence.Precio}">
      <button class="btn btn-success" onclick="saveEdit(${CodigoDelProducto})">Guardar</button>
    </div>
  `;
  document.getElementById("essence-List").innerHTML = editForm;
};

//Guardar la informacion Actualizada
window.saveEdit = async (CodigoDelProducto) => {
  const essenceUpdate = {
    NombreDelProducto: document.getElementById("NombreDelProducto").value,
    DetalleDelProducto: document.getElementById("DetalleDelProducto").value,
    Ingredientes: document.getElementById("Ingredientes").value,
    Uso: document.getElementById("Uso").value,
    Precio: parseFloat(document.getElementById("Precio").value),
  };
  await updateEssence(CodigoDelProducto, essenceUpdate);
  location.reload(); //Recarga la pagina para ver los cambios
};

//Borrar los productos
window.deleteEssence = async (CodigoDelProducto) => {
  await deleteEssence(CodigoDelProducto);
  location.reload(); //Recarga la pagina
};
