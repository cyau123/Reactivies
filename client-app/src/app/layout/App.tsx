import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {
  //check location from url
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
    <ModalContainer />
    <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {/* return homepage component if pathname is / , otherwise, return other components */}
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            {/* outlet renders child routes*/}
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

// must add observer
export default observer(App);
