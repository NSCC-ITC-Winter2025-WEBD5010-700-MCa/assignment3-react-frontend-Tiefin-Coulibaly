import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";

const BookEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      return response.json();
    },
    onSuccess: () => {
      console.log(data);
    },
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm();

  // useEffect(() => {
  //   console.log(data);
  //   // pre-populate the form if data present
  //   if (data) {
  //     setValue("title", data.title);
  //     setValue("author", data.author);
  //     setValue("published_year", data.published_year);
  //     setValue("genre", data.genre);
  //   }
  // }, [data]);

  const processData = (data) => {
    editBookMutation.mutate(data);
  };

  const editBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["booksData"]);
      navigate("/admin/books");
    },
  });

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Edit Book - {data?.id}
        </h2>
        <BookForm onDataCollected={processData} initialData={data}/>
      </div>
    </div>
  );
};

export default BookEdit;
