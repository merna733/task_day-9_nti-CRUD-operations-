const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

let users = [
    {
        id: 1,
        name: "Jana",
        age: 18
    },
    {
        id: 2,
        name: "Mohamed",
        age: 26
    },
    {
        id: 3,
        name: "Mai",
        age: 20
    },
];

let post = [
    {
        id: 1,
        title: " First post ",
        author: 1,
    },
    {
        id: 2,
        title: " Second post",
        author: 2,
    },
    {
        id: 3,
        title: "Third post",
        author: 3,
    },
];

const server = http.createServer((req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const urlParts = req.url.split('/');
        const userId = parseInt(urlParts[2]);
        const postId = parseInt(urlParts[2]);

        if (req.url === '/users' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));

        } else if (req.url === '/users' && req.method === 'POST') {
            const newUser = JSON.parse(body);
            users.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));

        } else if (urlParts[1] === 'users' && req.method === 'PUT') {
            const updatedUser = JSON.parse(body);
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    users[i] = { ...users[i], ...updatedUser };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(users[i]));
                    return;
                }
            }

        } else if (urlParts[1] === 'users' && req.method === 'DELETE') {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    const deleted = users.splice(i, 1)[0];
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(deleted));
                    return;
                }
            }

        } else if (req.url === '/posts' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(post));

        } else if (req.url === '/posts' && req.method === 'POST') {
            const newPost = JSON.parse(body);
            post.push(newPost);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newPost));

        } else if (urlParts[1] === 'posts' && req.method === 'PUT') {
            const updatedPost = JSON.parse(body);
            for (let i = 0; i < post.length; i++) {
                if (post[i].id === postId) {
                    post[i] = { ...post[i], ...updatedPost };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(post[i]));
                    return;
                }
            }

        } else if (urlParts[1] === 'posts' && req.method === 'DELETE') {
            for (let i = 0; i < post.length; i++) {
                if (post[i].id === postId) {
                    const deleted = post.splice(i, 1)[0];
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(deleted));
                    return;
                }
            }

        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
































































