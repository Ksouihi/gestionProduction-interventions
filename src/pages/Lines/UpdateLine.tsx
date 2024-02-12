import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Line} from "../../models/Product";

import axios from "axios";


  const UpdateLine = () =>  {
  const {id} = useParams()
    const navigate = useNavigate();
    const [name_line, setname_line] = useState<string>('');
    const [error, setError] = useState<string>('');

    const updateLine = () => {
        if(!name_line) {
            setError('Vous devez remplir le champ obligatoire !')
            return false;
        }

        const newLine: Line = {
           name_line,
            id: Date.now()
        }

        axios.put('http://localhost:8080/api/lines/'+id,{
          ...newLine
        })
        .then((res)=> {
          if(res.status === 200) {
            navigate('/lines');
          }
        })

        
    }
       useEffect(()=> {
       axios.get('http://localhost:8080/api/lines/'+id).then((res)=> {
        if(res.data.line) {
          setname_line(res.data.line.name_line)
          
        }
      })
    },[]);
    return (
        <>
        <Breadcrumb pageName="Modifer ligne" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Ligne
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nom de ligne *
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de ligne"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={name_line}
                    onChange={(e) => {
                      setname_line(e.target.value)
                        setError('')
                    }}
                  />
                </div>
  
                
                
                
              </div>
            </div>
            <p className="text-danger">{error}</p>
           <div className="flex justify-center py-4">
            <button className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={updateLine}>Modifier ligne</button>
           </div>

  

          </div>
        </div>
      </>
    );
};

export default UpdateLine;
  