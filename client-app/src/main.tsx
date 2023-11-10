import ReactDOM from 'react-dom/client'
import './app/layout/style.css'
import { StoreContext, store } from './app/stores/store.ts'
import { router } from './app/router/Routes.tsx'
import { RouterProvider } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  ,
)
