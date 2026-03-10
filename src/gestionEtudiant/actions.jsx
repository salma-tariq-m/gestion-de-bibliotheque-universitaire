export const Ajouter_etudiant=(livre)=>{
    return{
        type:"ajouter_etudiant",
        payload:livre
    }
}
export const Modifier_etudiant=(livre)=>{
    return{
        type:"modifier_etudiant",
        payload:livre
    }
}
export const Supprimer_etudiant=(id)=>{
    return{
        type:"supprimer_etudiant",
        payload:id
    }
}