import Afficher from "./affiche"
import AjouterEtudiant from "./ajouterEtudiant"
import { Route,Routes } from "react-router-dom"
import Nav from "../../nav"
function LivreApp() {
  return (
    <>
     <Nav/>
      <Routes>
        <Route path="/" element={<AjouterEtudiant />}></Route>
        <Route path="/afficher" element={<Afficher />}></Route>
      </Routes>
       
      
      
    </>
  )
}
export default LivreApp