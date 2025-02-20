import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Outlet, Link, useNavigate } from "react-router-dom";

const BooksTable = () => {
  const navigate = useNavigate();

  // Query data
  const {
    isPending,
    error,
    data: books,
    isFetching,
  } = useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/books");
      return response.json();
    },
    staleTime: Infinity,
  });

  if (error) return "An error has occurred: " + error.message;

  // use the query client provided
  const queryClient = useQueryClient();

  // Mutate the data by sending a delete request
  const deleteMutation = useMutation({
    mutationFn: async (bookId) => {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: "DELETE",
      });
      return response.text();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booksData"]);
    },
    onError: (error) => {
      alert("Unable to delete");
    },
  });

  const handleDelete = (bookId) => {
    // send a delete request to our api to delete the selected record
    if (window.confirm(`Are you sure you wish to delete record ${bookId} ?`)) {
      console.log(bookId);
      deleteMutation.mutate(bookId);
    }
  };

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <Outlet />
          <Link to="create">Add new book</Link>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Author
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Year
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Genre
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr key={book.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {book.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.author}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.published_year}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.genre}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                      <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">
                        Details
                      </button>
                      <button
                        onClick={() => navigate(`${book.id}/edit`)}
                        className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default BooksTable;
