import "./Navbar.css"
export const Navbar = ()=>{
    return(
        <>
        <div className="nav-conatiner">
            <h4 className="nav-logo-name">Watch Movie List</h4>
            <ul className="nav-bar">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/add">Add</a>
                </li>
            </ul>
        </div>
        </>
    )
}