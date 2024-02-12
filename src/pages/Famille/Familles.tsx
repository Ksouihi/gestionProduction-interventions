import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import TableFamilles from "../../components/tables/TableListes";

const Familles = () => {
  return (
    <>
      <div className="flex justify-between items-center py-4 gap-10">
        <Breadcrumb pageName="Liste des familles & Sous familles" />
        <div className="flex gap-10"> 
          <Link
            to="/famille"
            className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Ajouter famille
          </Link>
          <Link
            to="/famille/add"
            className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Ajouter sous famille
          </Link>
        </div>
      </div>   
      <div className="flex flex-col gap-10">
        <TableFamilles />
      </div>
    </>
  );
};

export default Familles;
