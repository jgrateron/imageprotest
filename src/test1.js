const axios = require('axios');
const fs = require('fs');

var url = "http://192.168.1.94:9090/api/v1/resize"

function mensaje_ok(mensaje) {
    console.info("\x1b[32m", "A " + mensaje, "\x1b[0m");
}

function mensaje_error(mensaje) {
    console.log("\x1b[31m", "R " + mensaje, "\x1b[0m");
}

function resize(name,filesrc,width,height,typesize,stretch)
{
    return new Promise((resolve, reject) => 
    {
        let imagen = fs.readFileSync(filesrc);
        let contentImg = imagen.toString("base64");
        axios.post(url,
        {
            "width" : width,
            "height" : height,
            "typesize" : typesize,
            "stretch" : stretch,
            "b64img" : contentImg
        })
        .then((response) => {
            if (response.data.success == true) {
                let data = response.data.imagen;
                let formatName = response.data.formatName;
                fs.writeFile("./output/" + name + "." + formatName, data, {encoding: 'base64'}, function(err) {
                    if (err){
                        mensaje_error(err);
                        return resolve();
                    }
                    mensaje_ok(name);
                    return resolve();
                });
            }
            else
            {
                mensaje_error(name + " " + response.data.message);
                resolve();
            }        
        })
        .catch((error) => {
            mensaje_error(name + " " + error);
            resolve();
        })
    })    
}

function noresize(name,filesrc,width,height,typesize,stretch)
{
    return new Promise((resolve, reject) => 
    {
        let imagen = fs.readFileSync(filesrc);
        let contentImg = imagen.toString("base64");
        axios.post(url,
        {
            "width" : width,
            "height" : height,
            "typesize" : typesize,
            "stretch" : stretch,
            "b64img" : contentImg
        })
        .then((response) => {
            if (response.data.success == false) {
                mensaje_ok(name + " " + response.data.message);
                return resolve();
            }
            else
            {
                mensaje_error(name);
                resolve();
            }        
        })
        .catch((error) => {
            mensaje_error(name + " " + error);
            resolve();
        })
    })    
}


//resize una imagen a 200x200
resize("test001","public/jpg/13640.jpg","200","200","px","true");

//resize una imagen a 200 de width y el height se mantiene igual
resize("test002","public/jpg/13640.jpg","200","","px","true");

//resize una imagen a 200 de height y el width se mantiene igual
resize("test003","public/jpg/13640.jpg","","200","px","true");

//resize una imagen a 200 de width y no se hace estiramiento
resize("test004","public/jpg/13640.jpg","200","","px","false");

//resize una imagen a 200 de height y no se hace estiramiento
resize("test005","public/jpg/13640.jpg","","200","px","false");

//resize una imagen a 50% de width y no se hace estiramiento
resize("test006","public/jpg/43123.jpg","50","","%","false");

//resize una imagen a 50% de height y no se hace estiramiento
resize("test007","public/jpg/43123.jpg","80","","%","false");

//no es una imagen valida
noresize("test008","public/pdf/paper.pdf","200","200","px","true")

//valor incorrecto width
noresize("test009","public/jpg/43123.jpg","20000","","px","false");

//valor incorrecto width
noresize("test010","public/jpg/43123.jpg","200p","","px","false");

//valor incorrecto width, porcentaje muy alto
noresize("test011","public/jpg/43123.jpg","600","","%","false");

//la nueva imagen al resize sobrepasa los limites
noresize("test012","public/jpg/13640.jpg","500","","%","false");

//valor incorrecto height
noresize("test013","public/jpg/43123.jpg","", "20000","px","false");

//valor incorrecto height
noresize("test014","public/jpg/43123.jpg","", "200p","px","false");

//valor incorrecto height, porcentaje muy alto
noresize("test015","public/jpg/43123.jpg","","600","%","false");

//la nueva imagen al resize sobrepasa los limites
noresize("test016","public/jpg/13640.jpg","","500","%","false");

//valor incorrecto en typesize
noresize("test017","public/jpg/13640.jpg","200","200","xx","true");

//valor incorrecto en stretch
noresize("test018","public/jpg/13640.jpg","200","200","px","verdadero");

//resize una imagen PNG a 50% de height y no se hace estiramiento
resize("test019","public/png/43123.png","80","","%","false");
