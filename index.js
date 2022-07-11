var name = 'Console'
var port = 8000
var hostname = 'localhost'

export async function setPort(int){
    port = int
}

export async function setHostname(str){
    hostname = str
}

export async function log(str){

const http = require('http')
var os = require('os');

const data = JSON.stringify({

    message: str,
    name: name,
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    version: os.version(),
    cpu: os.cpus()

});

const options = {
    url: `http://${hostname}`,
    port: port.toString(),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};


const req = http.request(options, (res) => {
    let data = '';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body: ', JSON.parse(data));
    });

}).on("error", (err) => {
    console.log("Error: ", err.message.toString());
});

req.write(data);
req.end();

}