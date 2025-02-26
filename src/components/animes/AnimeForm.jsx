import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AnimeForm = ({ onDataCollected, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("creator", initialData.creator);
      setValue("aired_year", initialData.aired_year);
      setValue("genre", initialData.genre);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit(onDataCollected)} className="space-y-4">
      <div>
        <input
          {...register("title", { required: "Title is required!" })}
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("creator", { required: "creator is required!" })}
          type="text"
          placeholder="Author"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.creator && (
          <p className="text-red-500 text-sm mt-1">{errors.creator.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("aired_year", {
            required: "Year is required!",
            min: { value: 1700, message: "Year must be greater than 1700" },
          })}
          type="number"
          placeholder="Year"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.aired_year && (
          <p className="text-red-500 text-sm mt-1">
            {errors.aired_year.message}
          </p>
        )}
      </div>
      <div>
        <input
          {...register("genre", { required: "Genre is required!" })}
          type="text"
          placeholder="Genre"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.genre && (
          <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
      >
        Submit Anime
      </button>
    </form>
  );
};

export default AnimeForm;
