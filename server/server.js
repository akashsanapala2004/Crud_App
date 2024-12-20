if (process.env.NODE_ENV != "production" ) {
    require("dotenv").config();
}
const express =  require('express');
const cors = require("cors");
const connectToDb = require('./config/connectToDb');
//const Notes = require("./models/note");
const notesController = require("./controllers/notesController");
const app = express();
app.use(express.json());
app.use(cors());
connectToDb();

app.get('/notes', notesController.fetchNotes);
app.get('/notes/:id',notesController.fetchNote);
app.post('/notes',notesController.createNote);
app.put('notes/:id',notesController.updateNote);
app.delete("/notes/:id",notesController.deleteNote);
app.listen(process.env.PORT);