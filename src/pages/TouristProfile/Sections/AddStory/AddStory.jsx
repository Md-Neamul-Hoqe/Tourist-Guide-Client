import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useTypes from "../../../../Hooks/useTypes";
import useAuth from "../../../../Hooks/useAuth";

const AddStory = () => {
  const { user } = useAuth();
  const axios = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [types, isLoadingTypes] = useTypes();

  const onSubmitForm = (data) => {
    // console.log(data);
    const { story, title, type, location } = data;
    
    const Package = types.filter((aType) => aType?.type === type);

    // console.log(Package);
    const tourStory = {
      title,
      type,
      thumbnail: Package?.[0].thumbnail,
      author: user?.displayName,
      email: user?.email,
      location,
      date: new Date(),
      story,
    };

    axios.post("/user/create-story", tourStory).then((res) => {
      if (res?.data?.insertedId) {
        // console.log("User photo updated.");

        Swal.fire({
          icon: "success",
          title: "Your story now on live.",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: `Database error: ${res?.data}.`,
          showConfirmButton: true
        });
      }
    });
  };

  return (
    <div className="py-5">
      <h3 className="text-2xl font-mono font-semibold text-center">Write a Story about your tour</h3>
      <form onSubmit={handleSubmit(onSubmitForm)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="title"
            className="input input-bordered"
            required
          />
          {errors.title && (
            <p className="text-red-600">Story title is required.</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className="input input-bordered"
            required
          />
          {errors.title && (
            <p className="text-red-600">Tour location is required.</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Type of the tour package</span>
          </label>
          {!isLoadingTypes && types?.length ? (
            <select className="select select-bordered" {...register("type")}>
              {types?.map((type, idx) => (
                <option key={idx} value={type?.type} className="capitalize">
                  {type?.type}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Story</span>
          </label>
          <textarea
            {...register("story", { required: true })}
            placeholder="Write your tour story..."
            className="textarea textarea-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Add Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;
