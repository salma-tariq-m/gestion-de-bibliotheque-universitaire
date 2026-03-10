import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import LivreApp from './gestionEtudiant/component/etudiantApp.jsx'
import store from './gestionLivre/store.jsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <LivreApp/>
    </BrowserRouter>
  </Provider>,
)
