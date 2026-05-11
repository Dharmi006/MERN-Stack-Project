import "../AddNotes.css";
export default function AddNote({addNote,titleInput,setTitleInput,contentInput,setContentInput,editId,editNoteSave}){
    return (
        <div className="Form">
            <form>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    placeholder="Enter title" 
                    name="title"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />
               <label htmlFor="content">Content</label>
               <textarea 
                placeholder="write your note" 
                name="content"
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}></textarea>
               {editId ? (
                    <button type="button" onClick={() => editNoteSave()}>Update Note</button>
                    ) : (
                    <button type="button" onClick={() => addNote()}>Save Note</button>
                )}
            </form>
        </div>
    )
}