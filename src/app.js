const port = process.env.PORT || 8080;

const http = require("http");
const url = require("url");

const storage = new Map();
const secrets = new Map();

const init = () => {
    storage.clear();
    secrets.clear();
};

const server = http.createServer((req, res) => {
    let data = "";

    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {
        const parsedUrl = url.parse(req.url, false);
        const urlChunks = parsedUrl.path.split("/").filter(item => item.length);
        const [key, ...tail] = urlChunks;
        const password = req.headers.authorization;

        if (tail.length) {
            res.writeHead(400);
            res.end();
            return;
        }

        switch (req.method) {
            case "GET": {
                if (storage.has(key) === false) {
                    res.writeHead(404);
                    break;
                }

                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(storage.get(key)));
                break;
            }
            case "POST": {
                if (password === undefined) {
                    res.writeHead(401);
                    break;
                }

                if (storage.has(key) === true) {
                    res.writeHead(409);
                    break;
                }

                secrets.set(key, password);
                storage.set(key, JSON.parse(data));
                res.writeHead(200);
                break;
            }
            case "PUT": {
                if (password === undefined || secrets.get(key) !== password) {
                    res.writeHead(401);
                    break;
                }

                storage.set(key, JSON.parse(data));
                res.writeHead(200);
                break;
            }
            case "DELETE": {
                if (password === undefined || secrets.get(key) !== password) {
                    res.writeHead(401);
                    break;
                }

                secrets.delete(key);
                storage.delete(key);
                res.writeHead(200);
                break;
            }
        }

        res.end();
    });
}).listen(port, () => {
    console.info("Server is listening on port", port);
});

module.exports = server;
module.exports.init = init;