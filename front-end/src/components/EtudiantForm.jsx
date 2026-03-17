import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { addEtudiant } from "../redux/slices/etudiantSlice";



const EtudiantForm = ({ onCancel }) => {



const dispatch = useDispatch();



const [etudiant, setEtudiant] = useState({

id_etudiant: "",

nom: "",

prenom: "",

email: "",

fillier: ""

});



const handleChange = (e) => {

setEtudiant({

...etudiant,

[e.target.name]: e.target.value

});

};



const handleSubmit = (e) => {

e.preventDefault();

dispatch(addEtudiant(etudiant));

};



return (

<form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>



<input

type="text"

name="id_etudiant"

placeholder="Id Etudiant"

value={etudiant.id_etudiant}

onChange={handleChange}

required

/><br/><br/>



<input

type="text"

name="nom"

placeholder="Nom"

value={etudiant.nom}

onChange={handleChange}

required

/><br/><br/>



<input

type="text"

name="prenom"

placeholder="Prenom"

value={etudiant.prenom}

onChange={handleChange}

required

/><br/><br/>



<input

type="email"

name="email"

placeholder="Email"

value={etudiant.email}

onChange={handleChange}

required

/><br/><br/>



<input

type="text"

name="fillier"

placeholder="Fillier"

value={etudiant.fillier}

onChange={handleChange}

required

/><br/><br/>



<button type="submit">Enregistrer</button>{" "}

{onCancel && (

<button type="button" onClick={onCancel}>

Annuler

</button>

)}



</form>

);

};



export default EtudiantForm;