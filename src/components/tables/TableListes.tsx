import { useEffect, useState } from 'react';
import {Family,SubFamily} from '../../models/Product'
import axios from 'axios';
import { Link } from 'react-router-dom';
const TableListes = () => {
  const [familles, setFamilles] = useState<Family[]>([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/famille').then((res) => {

        setFamilles(res.data); 
      
    })
  },[])
  const [SubFamilys, setSubFamilys] = useState<SubFamily[]>([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/subfamily').then((res) => {
      console.log(res.data)
      setSubFamilys(res.data); 
      
    })
  },[])
 
  return (
    <div>

    <div className="flex">
  <div className="w-1/2 mx-2">
  <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Famille
            </h5>
          </div>
          
          
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {familles.map(famille => <FamilyRow key={famille.id} {...famille} />)}

      </div>
  </div>
  <div className="w-1/2 mx-2">
  <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             SOUS Famille
            </h5>
          </div>

          
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {SubFamilys.map(SubFamily=> <SubFamilyRow key={SubFamily.id} {...SubFamily} />)}

      </div>
  </div>
</div>  
        
    </div>
  );
};

export default TableListes;

const FamilyRow = ({id,name_family } : Family) => {
  return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-2">
               
          
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{name_family}</p>
          </div>
                  
          <div className='flex items-center justify-center gap-2'>
            <Link to={`/famille/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
          </div>
        </div>
    )
}
const SubFamilyRow = ({id,name_sub_family } : SubFamily) => {
  return (
      <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-2">
        <div className="flex items-center gap-3 p-2.5 xl:p-5">
          <p className="hidden text-black dark:text-white sm:block">{name_sub_family}</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Link to={`/famille/add`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
        </div>
      </div>
  )
}

