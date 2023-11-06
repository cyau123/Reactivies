import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/style.css'
import { StoreContext, store } from './app/stores/store.ts'
import { router } from './app/router/Routes.tsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  ,
)
