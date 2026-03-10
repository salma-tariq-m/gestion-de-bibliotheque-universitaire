import { useSelector, useDispatch } from "react-redux";
import { Supprimer_etudiant } from "../actions";

function Afficher() {

    const livre = useSelector((state) => state.etudiants.etudiants);
    
    const dispatch = useDispatch();

    return (
        <>
        <table border="1">
            <thead>
                <tr>
                    <th>nom</th> 
                    <th>prenom</th>
                    <th>email</th>
                    <th>fillier</th>
                </tr>
            </thead>

            <tbody>
                {livre.map((ele,index) => (
                    <tr key={index}>
                        <td>{ele.nom}</td>
                        <td>{ele.prenom}</td>
                        <td>{ele.email}</td>
                        <td>{ele.fillier}</td>

                        <td>
                            <button onClick={() => dispatch(supprimer_etudiant(ele.id))}>
                                supprimer
                            </button>
                        </td>

                        <td>
                            <button>modifier</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default Afficher;