export default async function GetChild() {
  let data = [''];
  try {
    const response = await fetch('https://dummyjson.com/users');

    if (response.ok) {
      data = await fetch('https://dummyjson.com/users')
        .then((resp) => resp.json())
        .then((respon) => respon.users);
    } else {
      console.log('Respuesta de red OK pero respuesta de HTTP no OK');
    }
  } catch (error) {
    console.log('Hubo un problema con la petición Fetch:' + error);
  }
  return data;
}
