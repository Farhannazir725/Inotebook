
import noteContext from "../context/notes/noteContext";
import React,{ useContext , useState} from 'react'

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote} = context;   // notes and set nots ka humne yaha destruction ki hai
    const [note, setNote] = useState({title:"", description : "", tag:""} )
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description : "", tag:""})
        props.showAlert("Added Succesfully","success");
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value })

    }
  return (
    <div>
        <div className="container  my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id='title'value={note.title} name='title' onChange={onChange}/>
          
          </div>
          <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"value={note.description} name="description" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag}name="tag" onChange={onChange} minLength={5} required/>
          </div>
          
          
          <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default Addnote
  