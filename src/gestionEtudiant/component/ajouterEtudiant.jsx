import { useState } from "react"
import { useDispatch } from "react-redux"
import { Ajouter_etudiant } from "../actions"
export default function AjouterEtudiant(){
    const [nom,setNom]=useState("")
    const [prenom,setPrenom]=useState("")
    const [email,setEmail]=useState("")
    const [fillier,setFillier]=useState("")
    const dispatch=useDispatch()
    const ajouter=()=>{
        dispatch(Ajouter_etudiant({
            id:Date.now(),
            nom,
            prenom,
            email,
            fillier
        }))
    }
    return <>
    <h2>Ajouter livre</h2>
    <form action="" onSubmit={ajouter}>
        <label htmlFor="nom">nom </label>
        <input type="text" name="" id="nom" onChange={(e)=>{setNom(e)}} />
        <br />
        <label htmlFor="prenom">prenom</label>
        <input type="text" name="" id="prenom" onChange={(e)=>{setPrenom(e)}}/>
        <br />
        <label htmlFor="email">email</label>
        <input type="email" name="" id="email" onChange={(e)=>{setEmail(e)}} />
        <br />
        <label htmlFor="fillier">fillier</label>
        <input type="text" name="" id="fillier" onChange={(e)=>{setFillier(e)}} />
        <input type="submit" value="Ajouter" />
    </form>
    </>
}