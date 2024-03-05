import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/about.jsx'
import Play from './pages/play.jsx'
import Board from './pages/board.jsx'

const routers = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        {
            path: 'about',
            element: <About />
        },
        {
            path: '',
            element: <Play/>
        },
        {
            path: 'board',
            element: <Board/>
        }
        
    ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={routers} />
  // </React.StrictMode>,
)
