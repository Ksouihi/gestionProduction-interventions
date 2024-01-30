import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import TableInterventions from "../../components/tables/TableInterventions";

const Interventions = () => {
    return (
        <>
        <div className="flex gap-10 items-center py-4 justify-between">
            <Breadcrumb pageName="Liste des interventions" /> 
            <Link to="/interventions/add" className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Ajouter intervention</Link>
        </div>
        <div className="flex flex-col gap-10">
            <TableInterventions />
        </div>

        </>
    );
};

export default Interventions;
  