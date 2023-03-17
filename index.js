//Dependencies
import express from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore as getFirestoreLite, collection as collectionLite, getDocs, updateDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCMl9GKX9APzAeoswe5Jnkx_2muvhEDUGE",
    authDomain: "nibmprojectipcdev.firebaseapp.com",
    projectId: "nibmprojectipcdev",
    storageBucket: "nibmprojectipcdev.appspot.com",
    messagingSenderId: "75341590275",
    appId: "1:75341590275:web:8ac291d70c7c093dc50336",
    measurementId: "G-YP59928D4D"
};

const firebaseApp = initializeApp(firebaseConfig);
const dbLite = getFirestoreLite(firebaseApp);
const db = getFirestore(firebaseApp);
const api = express();

//Function to read DB
async function getCollection(db, colName) {
    const dataCol = collectionLite(db, colName);
    const dataSnapshot = await getDocs(dataCol);
    const DataList = dataSnapshot.docs.map(doc => doc.data());
    return DataList;
}

//Function to write to DB
async function addToCollection(db, colName) {
    const data = {
        stringExample: 'Hello, World!',
        booleanExample: true,
        numberExample: 3.14159265,
        dateExample: new Date('December 10, 1815'),
        arrayExample: [5, true, 'hello'],
        nullExample: null,
        objectExample: {
            a: 5,
            b: true
        }
    };
    const UUID = (new Date()).getTime();
    await setDoc(doc(db, colName, UUID.toString()), data);
}

api.use(express.json());
//Handling Get request for / URI
api.get('/', (req, res) => {
    res.send('Express App Running');
});


api.get('/db', (req, res) => {
    getCollection(dbLite, "StudentData").then(
        value => { res.send(value); }
    ).catch(
        err => {
            res.send("Error reading from DB");
            console.log(err);
        }
    )
});

api.put('/db', (req, res) => {
    addToCollection(db, "StudentData").then(
        value => { res.send("Done"); }
    ).catch(
        err => {
            res.send("Error writing to DB");
            console.log(err);
        }
    )
});



api.post('/recordTemp', (req, res) => {
    const sensorReading = req.query.temp || 0;
    const id = req.query.ID
    res.send('Sensor ID : ' + id + ', Sensor reading : ' + sensorReading);
});



api.post('/handleJSON', (req, res) => {
    const temp = req.body.temp;
    const light = req.body.light;
    const UID = req.body.sensorID.UID;
    // res.send('Sensor 1 Reading : ' + temp + ', Sensor 2 reading : ' + light);  
    res.send('UID : ' + UID);
});


//Deploying the listener
const port = process.env.PORT || 8080;
api.listen(port, () => console.log(`Express server listening on port
${port}`));