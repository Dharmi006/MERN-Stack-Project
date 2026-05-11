import "../Navbar.css"
export default function Navbar({searchInput,setSearchInput}){
    return(
            <nav className="Navbar">
                <h2 className="Heading">Notes App</h2>
                <div className="Searchbar">
                    <input  type="text" placeholder="search notes.." value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
                </div>
            </nav>
    );
};