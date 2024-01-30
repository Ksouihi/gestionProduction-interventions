import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Intervention, TypeIntervention } from "../../models/Intervention";
import axios from "axios";
import { Line } from "../../models/Product";

const UpdateIntervention = () => {
    const userJson = localStorage.getItem('user');
    const user =  userJson ? JSON.parse(userJson): undefined;

    const {id} = useParams();

    const navigate = useNavigate();
    const [type_interventions, setTypeInterventions] = useState<TypeIntervention[]>([]);
    const [lines, setLines] = useState<Line[]>([]);
    const [type_intervention, setTypeIntervention] = useState<TypeIntervention|undefined>(undefined);
    const [detail_intervention, setDetailIntervention] = useState<string>('');
    const [date_debut, setDateDebut] = useState<string|undefined>(undefined);
    const [date_fin, setDateFin] = useState<string|undefined>(undefined);
    const [line, setline] = useState<Line|undefined>(undefined);
    const [error, setError] = useState<string>('');
console.log(type_intervention);

    const addIntervention = () => {
        if(!type_intervention || (type_intervention.name_discontinue === 'Arrêt non planifié' && !detail_intervention) || !date_debut || !line) {
            setError('Vous devez remplir tous les champs obligatoires !')
            return false;
        }

        

        const newIntervention: Intervention = {
            type_intervention,
            detail_intervention,
            date_debut,
            date_fin,
            line,
            user,
            id: Date.now(),
            is_open: Boolean(date_fin)
        }

        
        
        axios.post('http://localhost:8080/api/interventions/'+id,{
            ...newIntervention
        }).then((res)=> {
            if(res.status === 200) {
                navigate('/interventions')
            }
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/interventionRelations').then((res)=> {
            if(res.data) {
                setTypeInterventions(res.data.type_interventions)
                setLines(res.data.lines)
            }
        })
        axios.get('http://localhost:8080/api/interventions/'+id).then((res)=>{
            if(res.data.intervention) {
                const interventionData = res.data.intervention
                setDateDebut(interventionData.date_debut)
                setDateFin(interventionData.date_fin)
                setline(interventionData.line)
                setTypeIntervention(interventionData.type_intervention)
                setDetailIntervention(interventionData.detail_intervention)
            }
        })
    },[])
    return (
        <>
            <Breadcrumb pageName="Ajouter intervention" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                            Intervention
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Type d'intervention *
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select 
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        value={type_intervention?.id}
                                        onChange={(e) => {
                                            const selectedTypeIntervention =  type_interventions.find(t=>t.id === Number(e.target.value));
                                            setTypeIntervention(selectedTypeIntervention)
                                            if(selectedTypeIntervention && selectedTypeIntervention.name_discontinue === 'Arrêt non planifié') {
                                                setDetailIntervention(detail_interventions[0])
                                            }
                                            setError('')
                                        }}
                                    >
                                        {type_interventions.map(t => <option key={t.id} value={t.id}>{t.name_discontinue}</option>)}
                                    </select>
                                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill="#637381"
                                        ></path>
                                        </g>
                                    </svg>
                                    </span>
                                </div>
                            </div>
    
                            {type_intervention?.name_discontinue === 'Arrêt non planifié' && (<div>
                            <label className="mb-3 block text-black dark:text-white">
                                Détail d'intervention *
                            </label>
                            <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={detail_intervention}
                                    onChange={(e) => {
                                        setDetailIntervention(e.target.value)
                                        setError('')
                                    }}
                                />
                            </div>)}
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Date de début *
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={date_debut}
                                    onChange={(e) => {
                                        setDateDebut(e.target.value)
                                        setError('')
                                    }}
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Date de fin
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={date_fin}
                                    onChange={(e) => {
                                        setDateFin(e.target.value)
                                        setError('')
                                    }}
                                />
                            </div>
                            <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Nom de ligne *
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <select 
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    value={line?.id}
                                    onChange={(e) => {
                                        setline(lines.find((l)=>l.id ===Number(e.target.value)))
                                        setError('')
                                    }}
                                >
                                    {lines.map(r => <option key={r.id} value={r.id}>{r.name_line}</option>)}
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill="#637381"
                                        ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            </div>
    
                            
                        </div>
                    </div>
                    <p className="text-danger">{error}</p>
                    <div className="flex justify-center py-4">
                        <button className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={addIntervention}>Modifier intervention</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateIntervention;
  