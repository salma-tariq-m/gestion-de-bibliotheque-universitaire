 import { Link } from "react-router-dom";
import "../css/sidebar.css"



const Sidebar = () => {

return (

<aside className="sidebar">




<nav>

<ul>

<li><Link to="/dashboard">Dashboard</Link></li>

<li><Link to="/livres">Livres</Link></li>

<li><Link to="/etudiants">Étudiants</Link></li>

<li><Link to="/emprunts">Emprunts</Link></li>

</ul>

</nav>

</aside>

);

};



export default Sidebar