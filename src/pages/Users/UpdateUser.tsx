import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import SwitcherThree from "../../components/SwitcherThree";
import { useNavigate, useParams } from "react-router-dom";
import { User, UserRole } from "../../models/User";
import axios from "axios";

const UpdateUser = () => {
  const {id} = useParams();
    const [roles,setRoles] = useState<UserRole[]>([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nom, setNom] = useState<string>('');
    const [prenom, setPrenom] = useState<string>('');
    const [role, setRole] = useState<UserRole|undefined>(undefined);
    const [active, setActive] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const updateUser = () => {
        if(!username || !password || !nom || !prenom || !role) {
            setError('Vous devez remplir tous les champs obligatoires !')
            return false;
        }

        const newUser: User = {
            username,
            password,
            nom,
            prenom,
            active,
            role,
            id
        }

        axios.post('http://localhost:8080/api/users/'+id, {
          ...newUser
        }).then((res)=>{
          if(res.status === 200) {
            navigate('/users');
          }
        })
    }

    useEffect(()=> {
      axios.get('http://localhost:8080/api/users/'+id).then((res)=>{
        if(res.data.user) {
          setUsername(res.data.user.username)
          setNom(res.data.user.nom)
          setPrenom(res.data.user.prenom)
          setRole(res.data.user.role)
          setActive(res.data.user.active)
        }
      })

      axios.get('http://localhost:8080/api/roles')
          .then((res)=> {
            if(res.data.roles) {
              setRoles(res.data.roles)
              setRole(res.data.roles[0]);
            }
          })
      
    },[]);
    return (
        <>
        <Breadcrumb pageName="Ajouter utilisateur" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Utilisateur
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Pseudo *
                  </label>
                  <input
                    type="text"
                    placeholder="Pseudo"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setError('')
                    }}
                  />
                </div>
  
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Mot de passe *
                  </label>
                  <input
                    type="text"
                    placeholder="Mot de passe"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                    }}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nom *
                  </label>
                  <input
                    type="text"
                    placeholder="Nom"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={nom}
                    onChange={(e) => {
                        setNom(e.target.value)
                        setError('')
                    }}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={prenom}
                    onChange={(e) => {
                        setPrenom(e.target.value)
                        setError('')
                    }}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Role *
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select 
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={role?.id}
                        onChange={(e) => {
                            setRole(roles.find((r)=>r.id === Number(e.target.value)))
                            setError('')
                        }}
                    >
                        {roles.map(r => <option key={r.id} value={r.id}>{r.role}</option>)}
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
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Status *
                  </label>
                  <SwitcherThree value={active} setValue={setActive}/>
                </div>
              </div>
            </div>
            <p className="text-danger">{error}</p>
           <div className="flex justify-center py-4">
            <button className="inline-flex items-center justify-center rounded bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={updateUser}>Modifier utilisateur</button>
           </div>

  

          </div>
        </div>
      </>
    );
};

export default UpdateUser;
  