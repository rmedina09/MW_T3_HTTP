/*Variables de configuracion -----------*/
const express = require('express');
const body = require('body-parser');
const app = express();
const port = 3000;

//app.use(express.static('public'));
app.use(body.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/* --- Inicializamos los arreglos ---*/
var actividades = {act1:'Cocinar', act2 : 'Lavar los platos', act3 : 'Barrer', act4 : 'Planchar', act5 : 'Ir al mercado'};
var actividadesHombres = {act1:0, act2 : 0, act3 : 0, act4 : 0, act5 : 0};
var actividadesMujeres = {act1:0, act2 : 0, act3 : 0, act4 : 0, act5 : 0};

app.get('/', (req, res) => {
    res.render('index.ejs', {actividades : actividades});
});

app.get('/actividadesGET', function(req, res) {
    sumaValores(req.query);
    res.render('ActividadesXGenero.ejs', {actividadesMujeres : actividadesMujeres, actividadesHombres : actividadesHombres, actividades : actividades});
    //res.redirect('../');
});

app.post('/actividadesPOST', function(req, res) {
    sumaValores(req.body);
    res.render('ActividadesXGenero.ejs', {actividadesMujeres : actividadesMujeres, actividadesHombres : actividadesHombres, actividades : actividades});
    // res.redirect('../');
});

/* --- Actualiza las etiquetas por medio de un formulario --- */
app.put('/actividadesPUT', (req, res) => {
    actualizaEtiquetas(req.query);   
    res.send('200');
});

/* --- Actualiza las etiquetas por medio de una petición PUT usando el API REST --- */
app.get('/actividadesPUT', (req, res) => {
    actualizaEtiquetas(req.query);    
    res.redirect('/');
});

/* --- Elimina una actividad del arreglo por medio de una petición DELETE usando el API REST ---*/
app.delete('/actividadesDELETE', (req, res) =>{
    eliminaEtiquetas(req.query);
    res.send('200');
});

/* --- Funcion que contabiliza las ocurrencias de un arreglo --- */
function sumaValores(arreglo){
    Object.keys(arreglo).forEach(function(e){
        (arreglo[e] == 'h') ? actividadesHombres[e]++ : actividadesMujeres[e]++ ;
    });
}

/*--- Funcion que actualiza las etiquetas ---*/
function actualizaEtiquetas(arreglo){
    Object.keys(arreglo).forEach(function(e){
        actividades[e] = arreglo[e];
    });
}

/*--- Actiliza las etiquetas ---*/
function eliminaEtiquetas(arreglo){
    Object.keys(arreglo).forEach(function(e){
        delete actividades[e];
    });
}

