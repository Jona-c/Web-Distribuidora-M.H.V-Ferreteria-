export const getMeFetch = async (token:any) => {
    const url = 'http://localhost:5000/api/user/me';// URL DE SERVIDOR LOCAL (EN VARIABLE DE ENTORNO .ENV)
                                                            //URL DE SERVIDOR EN LA NUBE (EN VARIABLE DE ENTORNO .ENV)

    const params = {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;

}
