import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Famille } from '../../models/Famille';
const TableFamilles = () => {
    const [familles, setFamilles] = useState<Famille[]>([]);
    useEffect(() => {
      axios.get('http://localhost:8080/api/famille').then((res) => {
        if (res.data && res.data.familles) {
          setFamilles(res.data.familles); 
        }
      })
    },[])
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nom de famille
            </h5>
          </div>
                
                 
        </div>
        {familles.map(famille => <FamilleRow key={famille.id} {...famille} />)}
      </div>
    </div>
  );
};

export default TableFamilles;

const FamilleRow = ({id,name_family } : Famille) => {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{name_family}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Link to={`/famille/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
          </div>
        </div>
    )
}
