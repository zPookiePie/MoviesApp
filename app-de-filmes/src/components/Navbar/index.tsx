import './index.scss'
import { FaGithub } from "react-icons/fa";
import { RiMovieFill } from "react-icons/ri";

function Navbar() {
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <RiMovieFill/>
                <h1 className="page-title">MoviesApp</h1>
            </div>
            <a href="https://github.com/zPookiePie" target='_blank'>
                <FaGithub/>
            </a>
        </nav>
    )
}

export default Navbar