import { Outlet } from 'react-router-dom';

function App() {
  return(
    <div>

      <h1>Future Navbar</h1>
      <Outlet />
      <h1>Future Footer</h1>
    
    </div>
  );
}

export default App;