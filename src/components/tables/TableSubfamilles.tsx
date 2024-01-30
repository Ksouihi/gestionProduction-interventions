import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubFamille} from '../../models/SubFamille';
const TableSubfamilles = () => {
    const [subfamilles, setTableSubfamilles] = useState<SubFamille[]>([]);
    useEffect(() => {
      axios.get('http://localhost:8080/api/famille/add').then((res) => {
        if (res.data.subfamille && res.data.subfamille.length > 0) {
          const subfamilleData = []; 
          res.data.familles.forEach(subfamille => {
            subfamilleData.push({
              name_family: subfamille.name_family,
              id: subfamille.id,
            })
          });
          setTableSubfamilles(subfamilleData); 
        }
      })
    }, [])
    
    
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nom de sous famille
            </h5>
          </div>
                
                 
        </div>
        {subfamilles.map(subfamille => <SubfamilleRow key={subfamille.id} {...subfamille} />)}
      </div>
    </div>
  );
};

export default TableSubfamilles;

const SubfamilleRow = ({id,name_sub_family } : SubFamille) => {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{name_sub_family}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Link to={`/famille/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
          </div>
        </div>
    )
}
