import { useEffect, useState } from 'react';
import {User} from '../../models/User'
import axios from 'axios';
import { Link } from 'react-router-dom';
const TableUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(()=>{
        axios.get('http://localhost:8080/api/users').then((res)=>{
          if(res.data.users && res.data.users.length > 0) {
            const usersData = [];
            res.data.users.forEach(user => {
              usersData.push({
                username: user.username,
                nom: user.nom,
                prenom: user.prenom,
                role: user.user_role,
                active: user.active,
                id: user.id,
              })
            });
            setUsers(usersData);
          }
        })
    },[])
    
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Pseudo
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nom
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Prenom
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {users.map(user => <UserRow key={user.id} {...user} />)}
      </div>
    </div>
  );
};

export default TableUsers;

const UserRow = ({id, username, password, role, active, nom, prenom} : User) => {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{username}</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{nom}</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{prenom}</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{role.role}</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">{active ? 'Active' : 'Désactivé'}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Link to={`/users/${id}`} className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</Link>
          </div>
        </div>
    )
}
