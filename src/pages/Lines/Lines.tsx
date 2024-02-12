import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import TableLines from "../../components/tables/TableLines";

const Lines = () => {
    return (
        <>
        <div className="flex gap-10 items-center py-4 justify-between">
            <Breadcrumb pageName="Liste des lignes" /> 
            <Link to="/lines/add" className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Ajouter une ligne </Link>
        </div>
        <div className="flex flex-col gap-10">
            <TableLines />
        </div>

        </>
    );
};

export default Lines;
  