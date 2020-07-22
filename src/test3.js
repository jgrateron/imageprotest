const axios = require('axios');
const fs = require('fs');
const user = "user";
const password = "123456";

var url = "http://localhost:8080/api/v1/rotate"

function mensaje_ok(mensaje) {
    console.info("\x1b[32m", "A " + mensaje, "\x1b[0m");
}

function mensaje_error(mensaje) {
    console.log("\x1b[31m", "R " + mensaje, "\x1b[0m");
}

function rotate (name, filesrc, angle, color)
{
    return new Promise((resolve, reject) => {
        let imagen = fs.readFileSync(filesrc);
        let contentImg = imagen.toString("base64");
        axios.post(url,
        {
            "angle" : angle,
            "b64img" : contentImg,
            "color" : color
        },
        {
            auth : {
                username : user,
                password : password
            }
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
function norotate (name, filesrc, angle, color)
{
    return new Promise((resolve, reject) => {
        let imagen = fs.readFileSync(filesrc);
        let contentImg = imagen.toString("base64");
        axios.post(url,
        {
            "angle" : angle,
            "b64img" : contentImg,
            "color" : color
        },
        {
            auth : {
                username : user,
                password : password
            }
        })
        .then((response) => {
            if (response.data.success == false) {
                mensaje_ok(name);
                return resolve();
            }
            else
            {
                mensaje_error(name + " " + response.data.success);
                resolve();
            }        
        })
        .catch((error) => {
            mensaje_error(name + " " + error);
            resolve();
        })
    })
}

rotate("test201","public/jpg/13640.jpg","10","16777215")
rotate("test202","public/jpg/13640.jpg","20","0")
rotate("test203","public/jpg/13640.jpg","30","16777215")
rotate("test204","public/jpg/13640.jpg","40","6579455")
rotate("test205","public/jpg/13640.jpg","50","255")
rotate("test206","public/jpg/13640.jpg","60","255")
norotate("test207","public/pdf/paper.pdf","60","255")
norotate("test208","public/jpg/13640.jpg","60k","255")
norotate("test209","public/jpg/13640.jpg","600","255")
norotate("test210","public/jpg/13640.jpg","-500","255")
norotate("test211","public/jpg/13640.jpg","100","255f")
rotate("test212","public/png/foto14.png","10","")
rotate("test213","public/png/foto14.png","20","")
rotate("test214","public/png/foto14.png","30","")
rotate("test215","public/png/foto14.png","40","")
rotate("test216","public/png/foto14.png","50","")