const app = require('./app.js');

const PORT =  5000;


app.listen(PORT, () => {
    console.log(`El servidor esta en ejecucion en http://localhost: ${PORT} ✅`)
})