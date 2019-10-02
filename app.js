const greeting = process.env.GREETING || 'Hello';
const port = process.env.PORT || 8080;
const serverstarthr = process.hrtime();
require('http').createServer(function (req, res) {
  // if argument provided then simulate workload
  const reqstarthr = process.hrtime();
  const workload = parseFloat(require('url').parse(req.url, true).query.workload) || 0.0;
  while (true) {
    const elapsedhr = process.hrtime(reqstarthr);
    const elapsed = ((elapsedhr[0] * 1e9) + elapsedhr[1]) / 1e6; // hr -> msecs
    if (elapsed > workload) break;
  }
  // respond with greeting and copy to stdout
  var result = greeting + ' from ' + require('os').hostname() + ' at ' + process.hrtime(serverstarthr);
  console.log('> ' + result);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(result + '\n');
}).listen(port);
console.log('Server running on ' + port);
