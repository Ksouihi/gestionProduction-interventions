import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import TableUsers from "../../components/tables/TableUsers";

const Users = () => {
    return (
        <>
        <div className="flex gap-10 items-center py-4 justify-between">
            <Breadcrumb pageName="Liste des utilisateurs" /> 
            <Link to="/users/add" className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Ajouter utilisateur</Link>
        </div>
        <div className="flex flex-col gap-10">
            <TableUsers />
        </div>

        </>
    );
};

export default Users;
  