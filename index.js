import express from 'express';
import { initializeApp } from "firebase/app";
import { getDocs, updateDoc } from 'firebase/firestore/lite';
import { getFirestore, collection } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCGO1gtGMbicfl5GtksHDVoNz11puXFFic",
    authDomain: "nibmtestprojectbyakila.firebaseapi.com",
    projectId: "nibmtestprojectbyakila",
    storageBucket: "nibmtestprojectbyakila.appspot.com",
    messagingSenderId: "539038346774",
    appId: "1:539038346774:web:a9e0d30347cdb8b2774f37",
    measurementId: "G-Q0W7LDF1K5"
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
//Function to read DB
async function getCollection(database, studentdata) {
    const dataCol = collection(database, studentdata);
    const dataSnapshot = await getDocs(dataCol);
    const DataList = dataSnapshot.docs.map(doc => doc.data());
    return DataList;
}
//Function to write to DB
async function addToCollection(database, studentdata) {
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
    await setDoc(doc(database, studentdata, UUID.toString()), data);
}
const api = express();
api.use(express.json());
//Handling Get request for / URI
api.get('/', (req, res) => {
    res.send('Express App Running');
});
api.get('/db', (req, res) => {
    getCollection(database, "LightSensor").then(
        value => { res.send(value); }
    ).catch(
        err => {
            res.send("Error reading from DB");
            console.log(err);
        }
    )
});
api.put('/db', (req, res) => {
    addToCollection(database, "LightSensor").then(
        value => { res.send("Done"); }
    ).catch(
        err => {
            res.send("Error writing to DB");
            console.log(err);
        }
    )
});
//Deploying the listener
const port = process.env.PORT || 8080;
api.listen(port, () => console.log(`Express server listening on port
${port}`));