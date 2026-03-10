const initialState = {
  etudiants: []
}
export default function reducerLivre(state=initialState,action){
    switch(action){
        case "ajouter_livre":
            return {...state,etudiants:[...state.etudiants,action.payload]}
        case "supprimer_etudiants":
            return {...state,etudiants:state.etudiants.filter(
                etudiants=>etudiants.id!==action.payload.id
            )}
        case "modifier_etudiants":
            return {...state,etudiants:state.etudiants.map(
                livre=>livre.id===action.payload.id ? action.payload :livre
            )}
        default:
            state
    }
}