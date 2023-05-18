import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'; 

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success");
    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='text-white container my-3'>
            <h2><b>Add A Note</b></h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><b>Title</b></label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><b>Description</b></label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><b>Tag</b></label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-light" onClick={handleClick}><b>Add Note</b></button>
            </form>
        </div>
    )
}

export default AddNote
