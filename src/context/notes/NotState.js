import React from "react";
import{useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
   const host = "http://localhost:4000"
   const notesInital = []
    const [notes,setNotes] = useState(notesInital)

    // Get All Notes
    const getNotes = async()=>{
      // API Call Add note
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
           headers: {
          "Content-Type": "application/json",
          "auth-token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMTk0ZjQxOTAxZGVlOWQ4YWQ2YjdmIn0sImlhdCI6MTY5NDc3MzcwOX0.SeifrYVLUET6FOqK8mXoc0ckdev6m2H4tHD5K8O9Eyc"
        }
      });
        const json = await response.json()
        console.log(json);
        setNotes(json)

       }




     // Add a note
     const addNote = async(title, description, tag)=>{
      // TODO: Api Call

      // API Call Add note
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
           headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token') 
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))

            }



     // Delete a note
     const deleteNote = async(id)=>{
      // TODO: Api Call

      // API Call Delte
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
           headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = response.json(); 
      console.log(json)
        console.log("Deleting note with id" + id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
     }
     
     // Edit a note
     const editNote = async(id, title, description, tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
           headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json(); 
      console.log(json);  

      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to Edit in Client  
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      // console.log(newNotes)
      setNotes(newNotes)
     }
   
    return (
        <NoteContext.Provider value={{notes, addNote , deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;