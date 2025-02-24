import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";

const BookCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();



  const createBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["booksData"]);
      navigate("..");
    },
  });

  const processData = (data) => {
    createBookMutation.mutate(data);
  };

  return (
    <div>
      <h2>Create a new book</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Book
        </h2>
        <BookForm onDataCollected={processData}/>
      </div>
    </div>
  );
};

export default BookCreate;
