const initialState = {
  livres: []
}
export default function reducerLivre(state=initialState,action){
    switch(action){
        case "ajouter_livre":
            return {...state,livres:[...state.livres,action.payload]}
        case "supprimer_livres":
            return {...state,livres:state.livres.filter(
                livres=>livres.id!==action.payload.id
            )}
        case "modifier_livres":
            return {...state,livres:state.livres.map(
                livre=>livre.id===action.payload.id ? action.payload :livre
            )}
        default:
            state
    }
}