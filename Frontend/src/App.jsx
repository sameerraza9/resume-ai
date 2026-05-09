import { useState } from 'react'
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { authProvider } from './features/auth/auth.context.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <authProvider>
        <RouterProvider router={router} />
      </authProvider>
    </>
  )
}

export default App
