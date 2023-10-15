import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'

//páginas
import Home from './routes/Home.jsx'
import NewPost from './routes/NewPost.jsx'
import ClientesAdvogados from './routes/ClientesAdvogados.jsx'
import Clientes from './routes/Clientes.jsx'
import Advogados from './routes/Advogados.jsx'
import ProcessoDetalhes from './routes/ProcessoDetalhes.jsx'

const router = createBrowserRouter([
  {
    element:<App />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
      {
        path: "/clientesadvogados",
        element: <ClientesAdvogados />,
      },
      {
        path: "/clientes",
        element: <Clientes />
      },
      {
        path: "/advogados",
        element: <Advogados />
      },
      {
        path: "/processodetail/:numeroProcesso",
        element: <ProcessoDetalhes />
      }
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
