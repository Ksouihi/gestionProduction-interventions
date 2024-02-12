import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {SubFamily } from '../../models/Product';
const TableSubfamilles = () => {
  const [SubFamilys, setSubFamilys] = useState<SubFamily[]>([]);
    useEffect(() => {
      axios.get('http://localhost:8080/api/famille/add').then((res) => {
        if (res.data && res.data.s) {
          setSubFamilys(res.data.Sub_familys); 
        }
      })
    },[])
    
    
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
      {SubFamilys.map(SubFamily=> <SubFamilyRow key={SubFamily.id} {...SubFamily} />)}
    </div>
  </div>
);
};


export default TableSubfamilles;


const SubFamilyRow = ({id,name_sub_family } : SubFamily) => {
  return (
      <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
        <div className="flex items-center gap-3 p-2.5 xl:p-5">
          <p className="hidden text-black dark:text-white sm:block">{name_sub_family}</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Link to={`/famille/add/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
        </div>
      </div>
  )
}


