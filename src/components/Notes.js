import React,{ useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import Addnote from "./Addnote";
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    let navigat = useNavigate();
  const {notes , getNotes , editNote} = context;   // notes and set nots ka humne yaha destruction ki hai  
      useEffect(()=>{
        if(localStorage.getItem('token')){
          getNotes();
        }else{
          navigat("/login");
        }
        // eslint-disable-next-line 
                }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:"", etitle:"", edescription : "", etag:""} )

    const handleClick = (e)=>{
    console.log("Updating the note ..... ", note )
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click(); 
    props.showAlert("deleted Succesfully","success");
                             }

    const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    
  }
    const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value })

}
  return (
      <>
      <Addnote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          {/* Form for modal Update note */}
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id='etitle' name='etitle' value={note.etitle} onChange={onChange}/>
          
          </div>
          <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
          </div>
          
          
          
      </form>

      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleClick} type="button" className="btn btn-primary" >Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row  my-3">
        <h3>Your Note</h3>
        <div className="container mx-2">
        {notes.length ===0 && 'No Mesaage to Display'}
        </div>
        {notes.map((note)=>{ 
          return <Noteitem key={note._id } updateNote ={updateNote} showAlert={props.showAlert} note={note}/>;
      })}

        </div>
        </>
  )
}

export default Notes
