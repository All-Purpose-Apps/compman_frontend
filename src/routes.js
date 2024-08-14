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
// Entries Imports
import ViewEntries from 'src/views/Entries/ViewEntries';
import ViewOneEntry from 'src/views/Entries/ViewOneEntry';
import NewEntry from 'src/views/Entries/NewEntry';
import EditEntry from 'src/views/Entries/EditEntry';
// Heat Imports
import ViewHeats from 'src/views/Heats/ViewHeats';
import NewHeat from 'src/views/Heats/NewHeat';
import AutoGenerateHeats from 'src/views/Heats/AutoGenerateHeats';
// Settings Imports
import Settings from 'src/views/Settings';
import FAQ from 'src/views/FAQ';
import ScheduleCall from 'src/views/ScheduleCall';

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
  // Entry Routes
  {
    path: 'entries',
    layout: '/admin',
    component: ViewEntries,
  },
  {
    path: 'entries/:id',
    layout: '/admin',
    component: ViewOneEntry,
  },
  {
    path: 'entries/new',
    layout: '/admin',
    component: NewEntry,
  },
  {
    path: 'entries/edit/:id',
    layout: '/admin',
    component: EditEntry,
  },
  // Heat Routes
  {
    path: 'heats',
    layout: '/admin',
    component: ViewHeats,
  },
  {
    path: 'heats/generate',
    layout: '/admin',
    component: AutoGenerateHeats,
  },
  {
    path: 'heats/new',
    layout: '/admin',
    component: NewHeat,
  },
  {
    path: 'settings',
    layout: '/admin',
    component: Settings,
  },
  {
    path: 'faq',
    layout: '/admin',
    component: FAQ,
  },
  {
    path: 'schedule-call',
    layout: '/admin',
    component: ScheduleCall,
  },
];

export default routes;
