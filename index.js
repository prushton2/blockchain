const http = require('http');
const publicdb = require('./publicdb');

const requestListener = async(req, res) => {
  url = req.url.split("/")
  url = url.slice(1)

  if(url[0] == "publicdb") {
    output = await publicdb.run(req, url)
    res.end(JSON.stringify(output));
  } else {
    res.end('{ "Status": 404 }')
  }

}

const server = http.createServer(requestListener);
server.listen(8080);