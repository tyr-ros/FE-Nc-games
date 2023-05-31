import { Link } from "react-router-dom"
import Header from "./Header"
export default function Nav() {
    return<nav className='nav'>
        <Header/>
        <Link to='/' className='home_link'>Home</Link>
        <Link to='/reviewsList' className='nav_link'>Reviews</Link>
        
    </nav>
}
