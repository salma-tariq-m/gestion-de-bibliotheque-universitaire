import AfficherLivres from "./affichage"
import AjouterLivre from "./ajouterLivre"
import { Route,Routes } from "react-router-dom"
import Nav from "../../nav"
function LivreApp() {
  return (
    <>
     <Nav/>
      <Routes>
        <Route path="/" element={<AjouterLivre />}></Route>
        <Route path="/afficher" element={<AfficherLivres />}></Route>
      </Routes>
       
      
      
    </>
  )
}
export default LivreApp