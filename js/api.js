const API_URL = "http/localhost:3000/api/essence";

//Obtener todos los productos
export const getEssence = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

//Obtener productos Por codigo
export const getEssencebyId = async (CodigoDelProducto) => {
  const response = await fetch(`${API_URL}/${CodigoDelProducto}`);
  return response.json();
};

//crear un producto

export const addEssence = async (essence) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: json.stringify(essence),
  });
  return response.json();
};

//actualizar un producto

export const updateEssence = async (CodigoDelProducto, essence) => {
  const response = await fetch(`${API_URL}/${CodigoDelProducto}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: json.stringify(essence),
  });
  return response.json();
};

//Borrar producto

export const deleteEssence = async (CodigoDelProducto) => {
  return fetch(`${API_URL}/${CodigoDelProducto}`, {
    method: "DELETE",
  });
};
