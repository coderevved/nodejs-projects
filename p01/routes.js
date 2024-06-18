const fs = require('fs');

const reqHandler = (req, res) => {
    res.setHeader('Content-Type','text/html');
    if(req.url === '/' && req.method === 'GET'){
        res.write('<html>');
        res.write('<head><title>Learning Node JS</title></head>');
        res.write('<body><form action="/message" method="POST">');
        res.write('<input type="text" name="inputMessage"></input>');
        res.write('<button type="submit">Send</button></form></body');
        res.write('</html>')
        res.end();
    }
    else if (req.url === '/message' && req.method === 'POST'){
        const reqBody = [];
        req.on('data', (chunk) => {
            reqBody.push(chunk);
        });
        req.on('end',() => {
            const parsedBody = Buffer.concat(reqBody).toString();
            const inputMessage = parsedBody.split('=')[1];
            fs.writeFileSync('response.txt',inputMessage, (err) => {
                console.error({err});
                res.setHeader('Location','/');
                res.statusCode = 302;
                return res.end();
            });
            res.write('<html>');
            res.write('<head><title>Learning Node JS</title></head>');
            res.write('<body><h1>'+inputMessage+'</h1></body>');
            res.write('</html>')
            res.end();
        })
    }
}

exports = reqHandler;