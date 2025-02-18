import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import "../index.css";
import BooksTable from "../components/books/BooksTable";

const Books = () => {
  

  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
       <p>Welcome to the admin Books.</p>
      <Link to="create">Add new book</Link>
      <Outlet/>
    </div>
  );
};

export default Books;
