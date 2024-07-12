const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ICONS = {
  folder: '&#128193;',  
  file: '&#128196;'     
};

const server = http.createServer((req, res) => {
  const requestedPath = path.join(__dirname, req.url);

  fs.stat(requestedPath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Server Error</h1>');
      }
      return;
    }

    if (stats.isDirectory()) {
      fs.readdir(requestedPath, (err, files) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>Internal Server Error</h1>');
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(generateDirectoryListing(requestedPath, files));
      });
    } else {
      fs.readFile(requestedPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>Internal Server Error</h1>');
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
      });
    }
  });
});

function generateDirectoryListing(directoryPath, files) {
  const relativePath = path.relative(__dirname, directoryPath);
  const parentPath = path.dirname(relativePath);

  let fileList = files.map(file => {
    const filePath = path.join(directoryPath, file);
    const icon = fs.statSync(filePath).isDirectory() ? ICONS.folder : ICONS.file;
    return `<li>${icon} <a href="${path.join('/', relativePath, file)}">${file}</a></li>`;
  }).join('');

  return `
    <html>
    <head>
      <title>Directory Listing</title>
    </head>
    <body>
      <h1>Directory Listing</h1>
      ${relativePath !== '' ? `<a href="${path.join('/', parentPath)}">Up</a>` : ''}
      <ul>${fileList}</ul>
    </body>
    </html>
  `;
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
