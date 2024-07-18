import Dashboard from 'src/views/Dashboard';
// Studio Imports
import ViewStudios from 'src/views/Studios/ViewStudios';
import ViewOneStudio from 'src/views/Studios/ViewOneStudio';
import NewStudio from 'src/views/Studios/NewStudio';
import EditStudio from 'src/views/Studios/EditStudio';
// Dancer Imports
import ViewDancers from 'src/views/Dancers/ViewDancers';
import ViewOneDancer from 'src/views/Dancers/ViewOneDancer';
import NewDancer from 'src/views/Dancers/NewDancer';
import EditDancer from 'src/views/Dancers/EditDancer';
// Couple Imports
import ViewCouples from 'src/views/Couples/ViewCouples';
import ViewOneCouple from 'src/views/Couples/ViewOneCouple';
import NewCouple from 'src/views/Couples/NewCouple';
import EditCouple from 'src/views/Couples/EditCouple';
// Auth Imports
import Login from 'src/views/Auth/Login';

const routes = [
  {
    path: 'dashboard',
    layout: '/admin',
    component: Dashboard,
  },
  // Studio Routes
  {
    path: 'studios',
    layout: '/admin',
    component: ViewStudios,
  },
  {
    path: 'studios/:id',
    layout: '/admin',
    component: ViewOneStudio,
  },
  {
    path: 'studios/new',
    layout: '/admin',
    component: NewStudio,
  },
  {
    path: 'studios/edit/:id',
    layout: '/admin',
    component: EditStudio,
  },
  // Dancer Routes
  {
    path: 'dancers',
    layout: '/admin',
    component: ViewDancers,
  },
  {
    path: 'dancers/:id',
    layout: '/admin',
    component: ViewOneDancer,
  },
  {
    path: 'dancers/new',
    layout: '/admin',
    component: NewDancer,
  },
  {
    path: 'dancers/edit/:id',
    layout: '/admin',
    component: EditDancer,
  },
  // Couple Routes
  {
    path: 'couples',
    layout: '/admin',
    component: ViewCouples,
  },
  {
    path: 'couples/:id',
    layout: '/admin',
    component: ViewOneCouple,
  },
  {
    path: 'couples/new',
    layout: '/admin',
    component: NewCouple,
  },
  {
    path: 'couples/edit/:id',
    layout: '/admin',
    component: EditCouple,
  },
  // Auth Routes
  {
    path: '/login',
    layout: '/auth',
    component: Login,
  },
];

export default routes;
