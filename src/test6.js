const axios = require('axios');
const fs = require('fs');

var url = "http://192.168.1.94:9090/api/v1/crop"

function mensaje_ok(mensaje) {
    console.info("\x1b[32m", "A " + mensaje, "\x1b[0m");
}

function mensaje_error(mensaje) {
    console.log("\x1b[31m", "R " + mensaje, "\x1b[0m");
}

function crop (name, urlimg, x, y, width, height)
{
    return new Promise((resolve, reject) => {
        axios.post(url,
        {
            "x" : x,
            "y" : y,
            "width" : width,
            "height" : height,
            "urlimg" : urlimg
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

crop("test501","http://192.168.1.93:8080/jpg/huge.jpg","4252","2930","200","200")
crop("test502","https://icdn3.digitaltrends.com/image/digitaltrends_es/dell-g5-se-02-768x768.jpg","0","0","600","500")

