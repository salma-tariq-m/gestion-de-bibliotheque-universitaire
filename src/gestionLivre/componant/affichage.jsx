import { useSelector, useDispatch } from "react-redux";
import { Supprimer_Livre } from "../actions";

function AfficherLivres() {

    const livre = useSelector((state) => console.log(state));
    
    const dispatch = useDispatch();

    return (
        <>
        <table border="1">
            <thead>
                <tr>
                    <th>titre de livre</th> 
                    <th>hauteur de livre</th>
                    <th>quantite</th>
                    <th>annee de publication</th>
                    <th>actions</th>
                </tr>
            </thead>

            <tbody>
                {livre.map((ele,index) => (
                    <tr key={index}>
                        <td>{ele.titre}</td>
                        <td>{ele.hauteur}</td>
                        <td>{ele.qantite}</td>
                        <td>{ele.annee}</td>

                        <td>
                            <button onClick={() => dispatch(Supprimer_Livre(ele.id))}>
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

export default AfficherLivres;