import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AnimeForm from "./AnimeForm";

const AnimeCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createBookMutation = useMutation({
    mutationFn: async (data) => {
      // parse the aired year in integer to be stored in the db
      for (let key in data) {
        if (key === "aired_year") {
          data[key] = parseInt(data[key]);
        }
      }
      const response = await fetch("http://localhost:3000/animes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["animesData"]);
      navigate("..");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const processData = (data) => {
    createBookMutation.mutate(data);
  };
  return (
    <div>
      <h2>Create a new anime</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Anime
        </h2>
        <AnimeForm onDataCollected={processData} />
      </div>
    </div>
  );
};

export default AnimeCreate;
