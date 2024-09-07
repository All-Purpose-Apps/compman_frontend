import Dashboard from 'src/views/Dashboard';
// Studio Imports
import ViewStudios from 'src/views/Studios/ViewStudios';
import ViewOneStudio from 'src/views/Studios/ViewOneStudio';
import EditStudio from 'src/views/Studios/EditStudio';
// Dancer Imports
import ViewDancers from 'src/views/Dancers/ViewDancers';
import ViewOneDancer from 'src/views/Dancers/ViewOneDancer';
import EditDancer from 'src/views/Dancers/EditDancer';
// Entries Imports
import ViewEntries from 'src/views/Entries/ViewEntries';
import ViewOneEntry from 'src/views/Entries/ViewOneEntry';
import EditEntry from 'src/views/Entries/EditEntry';
// Heat Imports
import ViewHeats from 'src/views/Heats/ViewHeats';
// import EditHeat from 'src/views/Heats/EditHeat';
import ViewOneHeat from 'src/views/Heats/ViewOneHeat';
// Schedule Imports
import ScheduleCall from 'src/views/Other/ScheduleCall';
import ViewSchedule from './views/Schedules/ViewSchedule';
import EditSchedule from './views/Schedules/EditSchedule';
// Settings Imports
import Settings from 'src/views/Other/Settings';
import FAQ from 'src/views/Other/FAQ';
import EntryForm from './views/UserSide/EntryForm';

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
  // {
  //   path: 'heats/edit/:id',
  //   layout: '/admin',
  //   component: EditHeat,
  // },
  {
    path: 'heats/:id',
    layout: '/admin',
    component: ViewOneHeat,
  },
  {
    path: 'schedule',
    layout: '/admin',
    component: ViewSchedule,
  },
  {
    path: 'schedule/edit/:id',
    layout: '/admin',
    component: EditSchedule,
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
  {
    path: 'entry-form',
    layout: '/user',
    component: EntryForm,
  },
];

export default routes;
