import { useState } from "react"
import { useDispatch } from "react-redux"
import { Ajouter_Livre,Supprimer_Livre } from "../actions"
export default function AjouterLivre(){
    const [titre,setTitre]=useState("")
    const [hauteur,setHauter]=useState("")
    const [quantite,setQantite]=useState("")
    const [annee,setAnnee]=useState("")
    const dispatch=useDispatch()
    const ajouter=()=>{
        dispatch(Ajouter_Livre({
            id:Date.now(),
            titre,
            hauteur,
            quantite,
            annee
        }))
    }
    return <>
    <h2>Ajouter livre</h2>
    <form action="" onSubmit={ajouter}>
        <label htmlFor="titre">titre de livre</label>
        <input type="text" name="" id="titre" onChange={(e)=>{setTitre(e)}} />
        <label htmlFor="hauteur">hauteur de livre</label>
        <input type="text" name="" id="hauteur" onChange={(e)=>{setHauter(e)}}/>
        <label htmlFor="quantite">quantite</label>
        <input type="number" name="" id="quantite" onChange={(e)=>{setQantite(e)}} />
        <label htmlFor="annee">annee de publication</label>
        <input type="text" name="" id="annee" onChange={(e)=>{setAnnee(e)}} />
        <input type="submit" value="Ajouter" />
    </form>
    </>
}