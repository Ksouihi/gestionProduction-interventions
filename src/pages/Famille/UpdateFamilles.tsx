import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Family } from "../../models/Product";
import axios from "axios";

const UpdateFamilles = () => {
const {id}=useParams()
    const navigate = useNavigate();
    const [name_family, setname_family] = useState<string>('');
    const [error, setError] = useState<string>('');

    const AddFamly = () => {
        if(!name_family) {
            setError('Vous devez remplir le nom de famille !')
            return false;
        }

        const newFamily: Family = {
            name_family,
            id: Date.now()
        }
        axios.put('http://localhost:8080/api/famille/'+id, {
          ...newFamily
        }).then((res)=>{
          if(res.status === 200) {
            navigate('/famille/Familles');
          }
        }).catch((err)=>{
          setError(err.response.data.message)
        })
    }
    useEffect(()=>{
axios.get('http://localhost:8080/api/famille/'+id).then((res)=>{
    if (res.data && res.data.family ){
        setname_family(res.data.family.name_family)
    }
})



    },[]) 
 
    
    return (
        <>
        <Breadcrumb pageName="Modifier famille" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                Famille
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nom famille *
                  </label>
                  <input
                    type="text"
                    placeholder="Nom famille de produit"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={name_family}
                    onChange={(e) => {
                        setname_family(e.target.value)
                        setError('')
                    }}
                  />
                </div>             
                      
             
                
              </div>
            </div>
            <p className="text-danger">{error}</p>
           <div className="flex justify-center py-4">
            <button className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={AddFamly}>Modifier famille</button>
           </div>

  

          </div>
        </div>
      </>
    );
};

export default UpdateFamilles;  