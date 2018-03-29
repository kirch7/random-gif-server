const http = require('http');
const fs = require('fs');

const imagesFolder = "."

getRandomImagePath = () => {
    const files = fs.readdirSync(imagesFolder);
    const images = files.filter(f =>
				f.endsWith(".gif") || f.endsWith(".jpeg") || f.endsWith(".jpg")
			       );

    if (images.length <= 0)
	return null;

    const chosenID = (Math.random() * images.length) | 0;
    
    return images[chosenID];    
}

http.createServer((request, response) => {
    let chosen = getRandomImagePath();
    response.writeHead(200, {'Content-Type': 'text/html'});

    if (chosen)
	response.write(`<image src='${chosen}'/>`);
    response.end();
})
    .listen(7777);

