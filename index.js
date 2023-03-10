const express = require('express');
const app = express();
app.use(express.json());
//Handling Get request for / URI
app.get('/', (req, res) => {
    res.send('Express App Running');
});

app.get('/time', (req, res) => {

    const time = new Date();
    res.send(time);
});

app.post('/testpost', (req, res) => {

    const sensorReading = req.query.temp || 0;
    if (sensorReading > 100) {
        res.send('Sensor reading greater than 100 :- ' + req.query.temp);
    } else {
        res.send('Sensor reading less than 100:- ' + req.query.temp);
    }
});

app.post('/handleJSON', function(req, res) {
    console.log(req.body);
    const sensorReading = req.body.temp;
    const sensorReading2 = req.body.light;
    const sensorid = req.body.sensorId.UID
    if (sensorReading) {
        //UpdateDB(sensorReading)
        res.send("Sensor 1 reading = " + sensorReading + " Sensor 2 reading = " + sensorReading2 + " Sensor ID :- " + sensorid);
    } else {
        res.send("Temp JSON parameter is not set in request");
    }
});



//Deploying the listener
const port = process.env.port || 0;
app.listen(port, () => console.log(`Express server listening on port
${port}`));