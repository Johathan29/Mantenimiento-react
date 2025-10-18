// Crear un objeto JSON
import fs from 'node:fs'
export default function insertDataMenssage(){
let miObjetoJSON = {
    "id":3,
    "userID":1,
    "email":"rosariojohathan@hotmail.com",
    "first_last_name": "Johathan Rosario",
    "message":"Hellos como esta? espero que bien",
    "date":"10 de julio 2025, 14:30 pm ",
    "remitente":2
  };
  
  // Insertar datos usando la notación de puntos
  miObjetoJSON.ciudad = "Santo Domingo";
  
  // Insertar datos usando la notación de corchetes
  miObjetoJSON["first_last_name"] = "Ingeniero";
  
  console.log(miObjetoJSON);
  // Resultado: { nombre: 'Juan', edad: 30, ciudad: 'Santo Domingo', profesion: 'Ingeniero' }
  
  // Para archivos JSON externos (ejemplo con Node.js)
 
  const filePath = './public/dataMensaje.json';
  
  // Leer el archivo JSON
  try {
    const datos = JSON.parse(fs.readFile(filePath));
  
    // Modificar los datos
    datos.nuevoDato = "valor nuevo";
  
    // Escribir los datos actualizados de vuelta al archivo
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2)); // null y 2 para formato legible
  
    console.log("Datos insertados correctamente en:", filePath);
  } catch (error) {
    console.error("Error al leer/escribir el archivo:", error);
  }
}