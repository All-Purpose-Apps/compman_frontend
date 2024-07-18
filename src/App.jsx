import { Routes, Route } from 'react-router-dom'
// Main Layout and Dashborad Imports
import MainLayout from './layouts/MainLayout'
import Dashboard from './views/Dashboard'
// Studio Imports
import ViewStudios from './views/Studios/ViewStudios'
import ViewOneStudio from './views/Studios/ViewOneStudio'
import NewStudio from './views/Studios/NewStudio'
import EditStudio from './views/Studios/EditStudio'
// Dancer Imports
import ViewDancers from './views/Dancers/ViewDancers'
import ViewOneDancer from './views/Dancers/ViewOneDancer'
import NewDancer from './views/Dancers/NewDancer'
import EditDancer from './views/Dancers/EditDancer'
// Couple Imports
import ViewCouples from './views/Couples/ViewCouples'
import ViewOneCouple from './views/Couples/ViewOneCouple'
import NewCouple from './views/Couples/NewCouple'
import EditCouple from './views/Couples/EditCouple'

export default function App() {
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Studio Routes */}
          <Route path="/studios" element={<ViewStudios />} />
          <Route path="/studios/new" element={<NewStudio />} />
          <Route path="/studios/:id" element={<ViewOneStudio />} />
          <Route path="/studios/:id/edit" element={<EditStudio />} />
          {/* Dancer Routes */}
          <Route path="/dancers" element={<ViewDancers />} />
          <Route path="/dancers/new" element={<NewDancer />} />
          <Route path="/dancers/:id" element={<ViewOneDancer />} />
          <Route path="/dancers/:id/edit" element={<EditDancer />} />
          {/* Couple Routes */}
          <Route path="/couples" element={<ViewCouples />} />
          <Route path="/couples/new" element={<NewCouple />} />
          <Route path="couples/:id" element={<ViewOneCouple />} />
          <Route path="couples/:id/edit" element={<EditCouple />} />
          {/* Not Found Route */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </MainLayout>
    </div>
  )
}
