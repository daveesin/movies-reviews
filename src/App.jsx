import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

function App() {

  return(
    <div className='w-full h-full flex flex-col '>

      <Navbar />
      <Outlet />
      <Footer />
    
    </div>
  );
}

export default App;