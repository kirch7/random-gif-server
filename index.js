const http = require('http');
const fs = require('fs');
const mime = require('mime');
const path = require('path');

const imagesFolder = ".";

const logPath = "./log.log";

getRandomImagePath = () => {
    const files = fs.readdirSync(imagesFolder);
    const images = files.filter(f =>
				f.endsWith(".gif") || f.endsWith(".jpeg") || f.endsWith(".jpg")
			       );

    if (images.length <= 0)
	return null;

    const chosenID = (Math.random() * images.length) | 0;
    
    return imagesFolder + '/' + images[chosenID];
}

http.createServer((request, response) => {
    var host = request.headers['host'];
    var url = request.url;
    var ip = request.connection.remoteAddress

    var log = `${ip} requests ${host} ${url}. `;
    
    let chosen = getRandomImagePath();
    if (chosen) {
	let extension = path.extname(chosen);
    
	let img = fs.readFileSync(chosen);
	response.writeHead(200, {
	    'Content-Type': mime.getType(extension)
	});
	response.write(img, 'binary');
	log += `Responding ${chosen}`;
    }
    response.end();
    log += '\n';
    fs.appendFile(logPath, log, err => {
	if (err)
	    console.error(err);
    });
})
    .listen(80);

