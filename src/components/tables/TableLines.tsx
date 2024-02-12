import { useEffect, useState } from 'react';
import {Line} from '../../models/Product'
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableLines = () => {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/lines').then((res)=> {
        setLines(res.data.lines);
      
    })
},[])
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nom de Ligne
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {lines.map(line => <LineRow key={line.id} {...line} />)}
      </div>
    </div>
  );
};

export default TableLines;

const LineRow = ({id,name_line } : Line) => {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-8">
                  
         <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{name_line}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Link to={`/Lines/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
          </div>
        </div>
    )
}
