import "../Navbar.css"
export default function Navbar({searchInput,setSearchInput,handleLogout,isLoggedIn,setShowLogin}){
    return(
            <nav className="Navbar">
                <h2 className="Heading">Notes App</h2>
                <div className="Searchbar">
                    <input  type="text" placeholder="search notes.." value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
                    {!isLoggedIn ? (
                    <button onClick={() => setShowLogin(true)}>Login</button>
                    ) : (
                    <button onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </nav>
    );
};
