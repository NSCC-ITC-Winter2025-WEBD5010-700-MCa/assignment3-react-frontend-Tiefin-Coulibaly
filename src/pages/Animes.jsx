import { Outlet } from "react-router-dom"

const Animes = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Animes</h1>
      <p>Welcome to the admin Animes.</p>
      <Outlet/>
    </div>
  )
}

export default Animes