const axios = require('axios');
const fs = require('fs');

var url = "http://192.168.1.94:9090/api/v1/rotate"

function mensaje_ok(mensaje) {
    console.info("\x1b[32m", "A " + mensaje, "\x1b[0m");
}

function mensaje_error(mensaje) {
    console.log("\x1b[31m", "R " + mensaje, "\x1b[0m");
}

function rotate (name, urlimg, angle, color)
{
    return new Promise((resolve, reject) => {
        axios.post(url,
        {
            "angle" : angle,
            "urlimg" : urlimg,
            "color" : color
        })
        .then((response) => {
            if (response.data.success == true) {
                let data = response.data.imagen;
                let formatName = response.data.formatName;
                fs.writeFile("./output/" + name + "." + formatName , data, {encoding: 'base64'}, function(err) {
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

rotate("test301","http://192.168.1.93:8080/jpg/13640.jpg","10","0")
rotate("test302","http://192.168.1.93:8080/jpg/13640.jpg","15","16777215")
rotate("test303","http://192.168.1.93:8080/jpg/13640.jpg","20","16777215")