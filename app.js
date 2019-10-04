const greeting = process.env.GREETING || 'Hello';
const port = process.env.PORT || 8080;
const serverstarthr = process.hrtime();

function doWork(workload) {
  const reqstarthr = process.hrtime();
  while (true) {
    const elapsedhr = process.hrtime(reqstarthr);
    const elapsed = ((elapsedhr[0] * 1e9) + elapsedhr[1]) / 1e6; // convert hr to msecs
    if (elapsed > workload) break;
  }
}

function requestHandler(req, res) {
  const workload = parseFloat(require('url').parse(req.url, true).query.workload) || 0.0;
  doWork(workload)
  var result = greeting + ' from ' + require('os').hostname() + ' at ' + process.hrtime(serverstarthr);
  console.log('> ' + result);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(result + '\n');
}

require('http').createServer(requestHandler).listen(port);
console.log('Server running on ' + port);
