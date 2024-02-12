import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { Family, SubFamily } from "../../models/Product";
import axios from "axios";

const AddSubFamly = () => {

      const navigate = useNavigate();
      const [families, setFamilies] = useState<Family[]>([]);
      const [family, setFamily] = useState<Family|undefined>(undefined);
      const [name_sub_family, setName_sub_family] = useState<string>('');
      const [error, setError] = useState<string>('');


  const AddSubFamly = () => {
        if(!name_sub_family ||!family) {
            setError('Vous devez remplir le nom de sous famille !')
            return false;
        }

        const newSub_family: SubFamily = {
          name_sub_family,
          id_family: family.id,
          id: Date.now()
        }

        axios.post('http://localhost:8080/api/famille/add', {
          ...newSub_family
        }).then((res)=>{
          if(res.status === 200) {
            navigate('/famille/familles');
          }
        }).catch((err)=>{
          setError(err.response.data)
        })
    }
    useEffect(()=> {
      axios.get('http://localhost:8080/api/famille')
        .then((res)=> {
          if (res.data) {
            console.log(res.data);
            setFamilies(res.data);
           
          }
        })
    },[])
    return (
        <>
        <Breadcrumb pageName="Ajouter sous famille" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                 Sous Famille
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Famille *
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select 
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={family?.id}
                        onChange={(e) => {
                            setFamily(families.find(f=>f.id === Number(e.target.value)))
                            setError('')
                        }}
                    >
                        {families.map(f => <option key={f.id} value={f.id}>{f.name_family}</option>)}
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
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Sous famille *
                  </label>
                   <input
                    type="text"
                    placeholder="Nom de Sous famille"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={name_sub_family}
                    onChange={(e) => {
                      setName_sub_family(e.target.value)
                        setError('')
                        }}
                    />
                  
                    
                </div>
                          
             
                
              </div>
            </div>
            <p className="text-danger">{error}</p>
           <div className="flex justify-center py-4">
            <button className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={AddSubFamly}>Ajouter sous famille</button>
           </div>

  

          </div>
        </div>
      </>
    );
};

export default AddSubFamly;
  