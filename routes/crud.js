const path = require("path")
const jsonCrud = (app, fs) => {
    
    const datasetsPath =  path.resolve('./datasets/johnhopkins.json');

    const readFile = (filePath = datasetsPath, encoding = 'utf8', returnJson = false, callback) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, filePath = datasetsPath, encoding = 'utf8', callback) => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    app.get('/data', (req, res) => {
        readFile(datasetsPath, 'utf8', false, (data) => {
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            res.send(jsonDataset[randomNum]);
        });
    });

    app.post('/data', (req, res) => {
        readFile(datasetsPath, 'utf8', true, (data) => {
            const newKey = Object.keys(data).length + 1;

            data[newKey.toString()] = req.body; 

            writeFile(JSON.stringify(data, null, 2), datasetsPath, 'utf8', () => {
                res.status(200).send('new data inserted');
            });
        }, true);
    });

    app.put('/data', (req, res) => {
        readFile(datasetsPath, 'utf8', true, (data) => {
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            data[randomNum] = req.body;

            writeFile(JSON.stringify(data, null, 2), datasetsPath, 'utf8', () => {
                res.status(200).send(`data key:${randomNum} updated`);
            });
        }, true);
    });

    app.delete('/data', (req, res) => {
        readFile(datasetsPath, 'utf8', false, (data) => {
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            delete data[randomNum];

            writeFile(JSON.stringify(data, null, 2), datasetsPath, 'utf8', () => {
                res.status(200).send(`data key:${randomNum} removed`);
            })

        }, true);
    })
}
module.exports = jsonCrud;