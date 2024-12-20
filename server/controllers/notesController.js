const Note = require("../models/note");

const fetchNotes = async (req,res) => {
  const notes = await Note.find();
  res.json({ notes });
};

const fetchNote = async (req,res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.json({ note });
};

const createNote = async (req,res) => {
  const { title , body } = req.body;
  const note = await Note.create({
      title,
      body,
  });
  res.json({ note });
};

const updateNote = async (req,res) => {
  const noteId =  req.params.id;
  const { title , body } = req.body;
  await Note.findByIdAndUpdate(noteId,{
      title: title,
      body: body
  });
  const note = await Note.findById(noteId);
  res.json({ note });
};

const deleteNote = async (req,res) => {
  const noteId = req.params.id;
  await Note.deleteOne({ id: noteId });
  res.json({ success: "Record deleted"});
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};