import { useSelector } from "react-redux";
export default function TotalBook() {
    const { livres, loading, error } = useSelector((state) => state.livres);
    const filteredLivres = livres.filter(
        (l) =>
            l.titre.toLowerCase().includes(search.toLowerCase()) ||
            l.auteur?.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
           
        </>
    )
}