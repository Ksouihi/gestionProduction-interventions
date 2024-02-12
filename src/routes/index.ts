import { lazy } from 'react';
import Users from '../pages/Users/Users';
import AddUser from '../pages/Users/AddUser';
import UpdateUser from '../pages/Users/UpdateUser';
import Products from '../pages/Products/Products';
import AddProduct from '../pages/Products/AddProduct';
import TableListes from '../pages/Famille/Familles';
import AddFamly from '../pages/Famille/AddFamly';
import AddSubFamly from '../pages/Famille/AddSubFamly';
import UpdateFamilles from '../pages/Famille/UpdateFamilles';
import AddLine from '../pages/Lines/AddLine';
import UpdateLine from '../pages/Lines/UpdateLine';
import Lines from '../pages/Lines/Lines';

import Interventions from '../pages/Interventions/Interventions';
import AddIntervention from '../pages/Interventions/AddIntervention';
import InterventionDetail from '../pages/Interventions/InterventionDetail';
import UpdateProduct from '../pages/Products/UpdateProduct';
import UpdateIntervention from '../pages/Interventions/UpdateIntervention';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/users',
    title: 'Liste des utilisateurs',
    component: Users,
  },
  {
    path: '/users/add',
    title: 'Ajouter utilisateur',
    component: AddUser,
  },
  {
    path: '/users/:id',
    title: 'Modifier utilisateur',
    component: UpdateUser,
  },
  {
    path: '/products',
    title: 'Liste des produits',
    component: Products,
  },
  {
    path: '/products/add',
    title: 'Ajouter produit',
    component: AddProduct,
  },


  {
    path: '/products/:id',
    title: 'Modifier produit',
    component: UpdateProduct,
  },
  {
    path: '/interventions',
    title: 'Liste des interventions',
    component: Interventions,
  },
  {
    path: '/interventions/add',
    title: 'Ajouter intervention',
    component: AddIntervention,
  },
  {
    path: '/interventions/:id',
    title: 'Intervention',
    component: UpdateIntervention,
  },
  {
    path: '/interventions/detail/:id',
    title: 'Intervention',
    component: InterventionDetail,
  },
   {
    path: '/interventions/detail/:id',
    title: 'Intervention',
    component: InterventionDetail,
  },
  {
    path: '/famille/familles',
    title: 'TableListes familles',
    component: TableListes,
  },
  
  {
    path: '/famille',
    title: 'Ajouter famille',
    component: AddFamly,
  },
  {
    path: '/famille/add',
    title: 'Ajouter sous famille',
    component: AddSubFamly,
  },
  {
    path: '/famille/:id',
    title: 'Modifer famille',
    component: UpdateFamilles,
  },

  {
    path: '/Lines',
    title: 'Liste des lignes',
    component: Lines,
  },
  {
    path: '/Lines/add',
    title: 'Ajouter ligne',
    component: AddLine,
  },

  {
    path: '/Lines/:id',
    title: 'Modifier ligne',
    component: UpdateLine,
 },
];

const routes = [...coreRoutes];
export default routes;
