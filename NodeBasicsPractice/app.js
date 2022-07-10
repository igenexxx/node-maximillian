const http = require('http');

http.createServer((req, res) => {
  const { url, method } = req;
  const users = ['User1', 'User2', 'User3'];

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Greetings!</h1>');
    res.write('<form action="/username" method="post"><label>Message: </label><input type="text" name="username"></label><button type="submit">Send</button></form>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<ul>')
    users.forEach(user => res.write(`<li>${user}</li>`));
    res.write('</ul>');
    return res.end();
  }

  if (url === '/username' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      console.log(Buffer.concat(body).toString().split('=')[1]);
      res.writeHead(302, {
        'Location': '/'
      }).end();
    })
  }
}).listen(3100);
