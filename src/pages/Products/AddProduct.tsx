import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { Family, Line, Product, SubFamily } from "../../models/Product";

import axios from "axios";


const AddProduct = () => {
    const [lines, setLines] = useState<Line[]>([]);
    const [families, setFamilies] = useState<Family[]>([]);
    const [allSubFamilies, setAllSubFamilies] = useState<SubFamily[]>([]);
    const [subFamilies, setSubFamilies] = useState<SubFamily[]>([]);
    const navigate = useNavigate();
    const [objective_fpy, setobjective_fpy] = useState<number|undefined>(undefined);
    const [objective_trg, setobjective_trg] = useState<number|undefined>(undefined);
    const [item_code, setitem_code] = useState<string>('');
    const [face, setface] = useState<string>('');
    const [name_prog, setname_prog] = useState<string>('');
    const [family, setFamily] = useState<Family|undefined>(undefined);
    const [sub_family, setsub_family] = useState<SubFamily|undefined>(undefined);
    const [cadence, setcadence] = useState<number|undefined>(undefined);
    const [line, setLine] = useState<Line|undefined>(undefined);
    const [error, setError] = useState<string>('');
    const [errorProductName, setErrorProductName] = useState<string>('');

    const addProduct = () => {
        if(!objective_fpy || !objective_trg || !item_code || !face || !name_prog || !family !|| !sub_family || !cadence || !line) {
            setError('Vous devez remplir tous les champs obligatoires !')
            return false;
        }

        const newProduct: Product = {
            cadence,
            line,
            sub_family,
            objective_fpy,
            objective_trg,
            item_code,
            face,
            name_prog,
            family,
            id: Date.now()
        }

        axios.post('http://localhost:8080/api/products',{
          ...newProduct
        })
        .then((res)=> {
          if(res.status === 200) {
            navigate('/products');
          }
        })

        
    }

    const getProductVision = (productName: string) => {
      if(productName.length >3) {
        setErrorProductName('');
        axios.get('http://localhost:8080/api/vision_synchro/'+productName).then((res)=> {
          setface(res.data.productVision.face ?? '')
        }).catch((err) => {
          setErrorProductName('le produit n\'existe pas')
        });
      }else {
        setErrorProductName('le produit n\'existe pas')
      }
    }

    useEffect(()=> {
      axios.get('http://localhost:8080/api/productRelations')
        .then((res)=> {
          if (res.data) {
            setFamilies(res.data.families);
            setAllSubFamilies(res.data.subFamilies);
            if(res.data.families && res.data.families.length > 0 && res.data.subFamilies && res.data.subFamilies.length >0) {
              setFamily(res.data.families[0]);
              const filtredSubFamilies = res.data.subFamilies.filter(f=>f.id_family === res.data.families[0].id) ?? []
              setSubFamilies(filtredSubFamilies);
              setsub_family(filtredSubFamilies.length > 0 ? filtredSubFamilies[0] : undefined)
            }
            setLines(res.data.lines);
            if(res.data.lines && res.data.lines.length >0) {
              setLine(res.data.lines[0]?? undefined);
            }
            
          }
        })
    },[])
    return (
        <>
        <Breadcrumb pageName="Ajouter Produit" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Produit
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nom de programme *
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de programme"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={name_prog}
                    onChange={(e) => {
                        setname_prog(e.target.value)
                        getProductVision(e.target.value)
                        setError('')
                    }}
                  />
                  <small className="text-red-500">{errorProductName}</small>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Réference *
                  </label>
                  <input
                    type="text"
                    placeholder="Réference"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={item_code}
                    onChange={(e) => {
                        setitem_code(e.target.value)
                        setError('')
                    }}
                  />
                </div>
  
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Objectif FPY *
                  </label>
                  <input
                    type="number"
                    placeholder="Objectif FPY"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={objective_fpy}
                    onChange={(e) => {
                        setobjective_fpy(Number(e.target.value) ?? 0 )
                        setError('')
                    }}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Objectif TRG *
                  </label>
                  <input
                    type="number"
                    placeholder="Objectif TRG"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={objective_trg}
                    onChange={(e) => {
                        setobjective_trg(Number(e.target.value) ?? 0)
                        setError('')
                    }}
                  />
                </div>
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
                            setSubFamilies(allSubFamilies.filter(s=>s.id_family === Number(e.target.value)))
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
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select 
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={sub_family?.id}
                        onChange={(e) => {
                            setsub_family(subFamilies.find(f=>f.id === Number(e.target.value)))
                            setError('')
                        }}
                    >
                        {subFamilies.map(s => <option key={s.id} value={s.id}>{s.name_sub_family}</option>)}
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
                    Nom de ligne *
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select 
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={line?.id}
                        onChange={(e) => {
                            setLine(lines.find(l=>l.id === Number(e.target.value)))
                            setError('')
                        }}
                    >
                        {lines.map(f => <option key={f.id} value={f.id}>{f.name_line}</option>)}
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
                    Cadence horaire *
                  </label>
                  <input
                    type="number"
                    placeholder="Cadence horaire"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={cadence}
                    onChange={(e) => {
                        setcadence(Number(e.target.value) ?? 0)
                        setError('')
                    }}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Face *
                  </label>
                  <input
                    type="text"
                    placeholder="Face"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={face}
                    onChange={(e) => {
                        setface(e.target.value)
                        setError('')
                    }}
                  />
                </div>
                

              </div>
            </div>
            <p className="text-danger">{error}</p>
           <div className="flex justify-center py-4">
            <button className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={addProduct}>Ajouter produit</button>
           </div>

  

          </div>
        </div>
      </>
    );
};

export default AddProduct;
  