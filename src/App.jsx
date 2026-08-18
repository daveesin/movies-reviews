import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';

function App() {
  return(
    <div className='w-full h-full flex flex-col '>

      <Navbar />
      <Outlet />
      <h1>Future Footer</h1>
    
    </div>
  );
}

export default App;