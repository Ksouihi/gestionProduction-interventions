import { useNavigate, useParams } from "react-router-dom";
import { Intervention } from "../../models/Intervention";
import InterventionComments from "./InterventionComments";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils";

const InterventionDetail = () => {
    const {id : idIntervention} = useParams();
    const [intervention, setIntervention] = useState<Intervention|undefined>(undefined)

    useEffect(()=> {
        axios.get('http://localhost:8080/api/interventions/'+idIntervention).then((res)=> {
            if(res.data.intervention) {
                setIntervention(res.data.intervention)
            }
        })
    },[])

    
    return (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 xl:col-span-8">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                            Intervention
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <span className="mb-3 block text-black dark:text-white">
                                    Type d'intervention
                                </span>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span>{intervention?.type_intervention?.name_discontinue}</span>
                                </div>
                            </div>
    
                            {intervention?.type_intervention.name_discontinue === 'Arrêt non planifié' && (<div>
                                <span className="mb-3 block text-black dark:text-white">
                                    Détail d'intervention
                                </span>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span>{intervention?.detail_intervention}</span>
                                </div>
                            </div>)}
                            <div>
                                <span className="mb-3 block text-black dark:text-white">
                                    Date de début
                                </span>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span>{formatDate(intervention?.date_debut)}</span>
                                </div>
                            </div>
                            <div>
                                <span className="mb-3 block text-black dark:text-white">
                                    Date de fin
                                </span>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span>{formatDate(intervention?.date_fin)}</span>
                                </div>
                            </div>
                            <div>
                            <span className="mb-3 block text-black dark:text-white">
                                Nom de ligne *
                            </span>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <span>{intervention?.line?.name_line}</span>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <InterventionComments idIntervention={idIntervention} />
        </div>
    );
}

export default InterventionDetail