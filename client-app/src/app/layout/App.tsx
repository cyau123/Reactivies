import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';


function App() {
  //check location from url
  const location = useLocation();
  
  return (
  // return homepage comonent if pathname is / , otherwise, return other components
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

// must add observer
export default observer(App);
