export const Ajouter_Livre=(livre)=>{
    return{
        type:"ajouter_livre",
        payload:livre
    }
}
export const Modifier_Livre=(livre)=>{
    return{
        type:"modifier_livre",
        payload:livre
    }
}
export const Supprimer_Livre=(id)=>{
    return{
        type:"supprimer_livre",
        payload:id
    }
}