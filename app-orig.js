const GREETING = process.env.GREETING || 'Hello'
const PORT = process.env.PORT || 8080

require('http').createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(GREETING + ' from ' + require('os').hostname() + ' at ' + process.hrtime() + '\n');
}).listen(PORT);
console.log('Server running on ' + PORT);
