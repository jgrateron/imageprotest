const axios = require('axios');
const fs = require('fs');

var url = "http://192.168.1.94:9090/api/v1/resize"

function mensaje_ok(mensaje) {
    console.info("\x1b[32m", "A " + mensaje, "\x1b[0m");
}

function mensaje_error(mensaje) {
    console.log("\x1b[31m", "R " + mensaje, "\x1b[0m");
}
//tests usando una url

function resize(name,urlimg,width,height,typesize,stretch)
{
    return new Promise((resolve, reject) => {
        axios.post(url,
        {
            "width" : width,
            "height" : height,
            "typesize" : typesize,
            "stretch" : stretch,
            "urlimg" : urlimg
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

function noresize(name,urlimg,width,height,typesize,stretch)
{
    return new Promise((resolve, reject) => {
        axios.post(url,
        {
            "width" : width,
            "height" : height,
            "typesize" : typesize,
            "stretch" : stretch,
            "urlimg" : urlimg
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
resize("test101","http://192.168.1.93:8080/jpg/13640.jpg","200","200","px","true")

//resize una imagen a 200 de width y el height se mantiene igual
resize("test102","http://192.168.1.93:8080/jpg/13640.jpg","200","","px","true")

//resize una imagen a 200 de height y el width se mantiene igual
resize("test103","http://192.168.1.93:8080/jpg/13640.jpg","","200","px","true")

//resize una imagen a 200 de width y no se hace estiramiento
resize("test104","http://192.168.1.93:8080/jpg/13640.jpg","200","","px","false")

//resize una imagen a 200 de height y no se hace estiramiento
resize("test105","http://192.168.1.93:8080/jpg/13640.jpg","","200","px","false")

//resize una imagen a 50% de width y no se hace estiramiento
resize("test106","http://192.168.1.93:8080/jpg/43123.jpg","50","","%","false")

//resize una imagen a 50% de height y no se hace estiramiento
resize("test107","http://192.168.1.93:8080/jpg/43123.jpg","","50","%","false")

//no es una imagen valida
noresize("test108","http://192.168.1.93:8080/pdf/paper.pdf","200","200","px","true")

//no es una imagen valida
noresize("test109","http://192.168.1.93:8080/pdf/documento.pdf","200","200","px","true")
