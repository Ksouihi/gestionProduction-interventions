import { Link } from 'react-router-dom';
import {Intervention} from '../../models/Intervention'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../../utils';
const TableInterventions = () => {
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    useEffect(()=> {
      axios.get('http://localhost:8080/api/interventions').then((res)=>{
        if(res.data.interventions) {
          setInterventions(res.data.interventions);
        }
      })
    },[])
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
        <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Type intervention
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Détail intervention
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date de début
            </h5>
          </div>
          
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nom de ligne
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date de fin
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {interventions.map(intervention => <InterventionRow key={intervention.id} {...intervention} />)}
      </div>
    </div>
  );
};

export default TableInterventions;

const InterventionRow = ({id,line,date_debut,date_fin,detail_intervention,is_open,type_intervention,rapportIntervention,user } : Intervention) => {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-7">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{type_intervention.name_discontinue}</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{detail_intervention}</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{formatDate(date_debut)}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{line.name_line}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{!is_open ? 'En cours' : 'Terminé'}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{formatDate(date_fin)}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
          <Link to={`/interventions/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
            <Link to={`/interventions/detail/${id}`} className='text-white bg-primary px-4 py-2 rounded'>voir</Link>
          </div>
        </div>
    )
}
