import { useEffect, useState } from "react"
import axios from "axios"
import './App.css'

function App() {
  const [notes,setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm,setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
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
    const res = await axios.post("http://localhost:5172/notes",createForm);
      setNotes([...notes,res.data.note]);
    setCreateForm({ title: "",body: ""});
    console.log(res);
  }
  const deleteNote = async (_id) => {
    const res = await axios.delete("http://localhost:5172/notes/"+_id);
    const newNotes = [...notes].filter(note => {
      return note._id !== _id;
    });
    setNotes(newNotes);
  };
  const handleupdateFieldChange = (e) => {
    const {value,name} = e.target
    setUpdateForm({
      ...updateForm,
      [name]: value
    });
  };
  const toggleUpdate = (note) => {
    setUpdateForm({
      title: note.title,
      body: note.body,
      _id: note._id,
    });
  };
  const UpdateNote = async (e) => {
    e.preventDefault();
    const { title, body } = updateForm;
    const res  = axios.put(`http://localhost:5172/notes/${updateForm._id}`,{title,body});
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) =>{
      return note._id === updateForm._id;
    })
    newNotes[noteIndex] = (await res).data.note;
    setNotes(newNotes);
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };
  return (
    <>
      <div className="App">
        <div >
        <h2>NOTES:</h2>
        {notes && notes.map( note => {
          return <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={() => deleteNote(note._id)}>Delete Note</button>
            <button onClick={() => toggleUpdate(note)}>Update Note</button>
          </div>
        })}
        </div>
        {updateForm._id && (
        <div>
        <h2>Update Note</h2>
        <form >
          <input    onChange={handleupdateFieldChange} value={updateForm.title} name="title" />
          <textarea onChange={handleupdateFieldChange} value={updateForm.body} name="body" id=""></textarea>
          <button  type="submit" >Update Note</button>
        </form>
        </div>
        )}
        

        {!updateForm._id && (
          <div>
          <h2>Create node</h2>
            <form onSubmit={createNote}>
            <input onChange={upadateCreateFormField} value={createForm.title} name="title" />
            <textarea onChange={upadateCreateFormField} value={createForm.body} name="body" id=""></textarea>
            <button type="submit">Crate Note</button>
          </form>
        </div>
      )}
      </div>
    </>
  )
}

export default App
