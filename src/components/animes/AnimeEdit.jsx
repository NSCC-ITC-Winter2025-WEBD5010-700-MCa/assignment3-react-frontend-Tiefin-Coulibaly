import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnimeForm from "./AnimeForm";

const AnimeEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["anime", id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_ANIMES_URL}/${id}`);
      return response.json();
    },
    onSuccess: () => {
      console.log(data);
    },
  });

  const processData = (data) => {
    editAnimeMutation.mutate(data);
  };

  const editAnimeMutation = useMutation({
    mutationFn: async (data) => {
      // parse the aired year in integer to be stored in the db
      for (let key in data) {
        if (key === "aired_year") {
          data[key] = parseInt(data[key]);
        }
      }
      const response = await fetch(`${import.meta.env.VITE_ANIMES_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["animesData"]);
      navigate("/admin/animes");
    },
  });

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Edit Anime - {data?._id}
        </h2>
        <AnimeForm onDataCollected={processData} initialData={data} />
      </div>
    </div>
  );
};

export default AnimeEdit;
