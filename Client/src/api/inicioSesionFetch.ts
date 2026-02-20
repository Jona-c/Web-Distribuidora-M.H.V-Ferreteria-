
export const inicioSesionFetch = async (data:unknown) => {
    const url = 'http://localhost:5000/api/auth/login';// URL DE SERVIDOR LOCAL (EN VARIABLE DE ENTORNO .ENV)
                                                            //URL DE SERVIDOR EN LA NUBE (EN VARIABLE DE ENTORNO .ENV)

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // se convierten los datos a JSON
    };

   const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    
    return result;

}
