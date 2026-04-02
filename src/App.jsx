 import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      
      <Navbar />
      <main className="flex-grow">
        <Outlet/>    {/* Outlet is the placeholder for the child routes defined in main.jsx */}
      </main>

      <Footer />
    </div>
  );
}

export default App;