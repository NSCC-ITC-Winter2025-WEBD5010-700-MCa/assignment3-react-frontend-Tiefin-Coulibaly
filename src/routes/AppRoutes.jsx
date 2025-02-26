import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserRoles from "../pages/UserRoles";
import UserManagement from "../pages/UserManagement";
import Dashboard from "../pages/Dashboard";
import AutoResponse from "../pages/AutoResponse";
import Customers from "../pages/Customers";
import BookCreate from "../components/books/BookCreate";
import Subscriptions from "../pages/Subscriptions";
import Books from "../pages/Books";
import BooksTable from "../components/books/BooksTable";
import BookEdit from "../components/books/BookEdit";
import Animes from "../pages/Animes";
import AnimesTable from "../components/animes/AnimesTable";
import AnimeCreate from "../components/animes/AnimeCreate";
import AnimeEdit from "../components/animes/AnimeEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "user-roles",
        element: <UserRoles />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "auto-response",
        element: <AutoResponse />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "books",
        element: <Books />,
        children: [
          { path: "", element: <BooksTable /> },
          {
            path: "create",
            element: <BookCreate />,
          },
          { path: ":id/edit", element: <BookEdit /> },
        ],
      },
      {
        path: "animes",
        element: <Animes />,
        children:[
          {path:"", element:<AnimesTable/>},
          {
            path: "create",
            element: <AnimeCreate />,
          },
          { path: ":id/edit", element: <AnimeEdit /> },
        ]
      },
    ],
  },
]);

export default router;
