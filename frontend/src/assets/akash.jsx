import { useEffect, useState } from "react"
import axios from "axios"
import './App.css'

function App() {
  const [notes,setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title:'',
    body: '',
  });
  useEffect(() => {
    fetchNotes();
  },[])
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5172/notes");
    //console.log(res);
    setNotes(res.data.notes);
  };
  const upadateCreateFormField = (e) => {
    const {name ,value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
    // console.log({name,value});
  };
  const createNote = async (e) => {
    e.preventDefault();
    const res = await axios.post("http:/localhost:5172/notes",createForm);
    setNotes([...notes,res.data.note]);
    //setCreateForm({ title: "",body: ""});
    console.log(res);
  }
  const deleteNote = async (_id) => {
    const res = await axios.delete("http://localhost:5173/notes/"+_id);
    const newNotes = [...notes].filter(note => {
      return note._id !== _id;
    });
    setNotes(newNotes);
  };
  return (
    <>
      <div className="App">
        <h2>NOTES:</h2>
        {notes && notes.map( note => {
          return <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={() => deleteNote(note._id)}>Delete Note</button>
          </div>
        })};
        <div>
          <h2>Create node</h2>
            <form onSubmit={createNote}>
            <input onChange={upadateCreateFormField} value={createForm.title} name="title" />
            <textarea onChange={upadateCreateFormField} value={createForm.body} name="body" id=""></textarea>
            <button type="submit">Crate Note</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
