import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const onSubmitForm = (data) => {
    console.log(data);
    const {
      email,
      password,
      name: displayName,
      photoURL,
      experiences,
      skills,
      education,
      phone,
      location,
      twitter,
      instagram,
    } = data;
    // https://i.ibb.co/WFhJcTx/user-3.png
    console.log({ email, password, name, photoURL });

    createUser(email, password)
      .then(() => {
        // const loggedUser = res?.user;

        // console.log('User created: ',loggedUser);
        updateUserProfile(displayName, photoURL)
          .then(() => {
            const userInfo = {
              name: displayName,
              role: "tourist",
              profilePicture: photoURL,
              education: education,
              skills: skills.split(","),
              workExperience: experiences.split(","),
              contactDetails: {
                email,
                phone,
                location,
                socialMedia: {
                  twitter,
                  instagram,
                },
              },
            };

            // console.log('User will updated: ',userInfo);

            axiosPublic.post("/create-user", userInfo).then((res) => {
              if (res?.data?.insertedId) {
                // console.log("User photo updated.");

                Swal.fire({
                  icon: "success",
                  title: "User profile updated successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });

                reset();

                navigate(from, { replace: true });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `Database error: ${res?.data}.`,
                  showConfirmButton: true,
                });
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });

        // console.log(res, loggedUser);
      })
      .catch((error) => {
        return Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <aside className="py-5">
      <h1 className="text-2xl md:text-5xl font-bold text-center">Register now!</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="md:card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="name"
            className="input input-bordered"
          />
        </div>

        {/* TODO: send message to admin to accept this role */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Requested Role</span>
          </label>
          <select
            name="role"
            className="select select-bordered"
            {...register("role", { value: "guide" })}>
            <option value="tourist">Tourist</option>
            <option value="guide">Guide</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...register("location")}
            type="text"
            placeholder="Location"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Email <span className="text-error">*</span>
            </span>
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="email"
            className="input input-bordered"
          />
          {errors.email && <p className="text-red-600">email is required.</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Phone <span className="text-error">*</span>
            </span>
          </label>
          <input
            {...register("phone", { required: true })}
            type="tel"
            placeholder="phone number"
            className="input input-bordered"
          />
          {errors.phone && (
            <p className="text-red-600">phone number is required.</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Twitter</span>
          </label>
          <input
            {...register("twitter")}
            type="text"
            placeholder="@username"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instagram</span>
          </label>
          <input
            {...register("instagram")}
            type="text"
            placeholder="@username"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <textarea
            {...register("skills")}
            type="text"
            placeholder="Skills..."
            className="textarea textarea-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Education</span>
          </label>
          <input
            {...register("education")}
            type="text"
            placeholder="Education..."
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Experience</span>
          </label>
          <textarea
            {...register("experiences")}
            type="text"
            placeholder="Experiences..."
            className="textarea textarea-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Password<span className="text-error">*</span>
            </span>
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
            })}
            type="password"
            placeholder="password"
            className="input input-bordered"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              password must be at least 6 characters long.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              password must have a number, a lowercase character, a uppercase
              character and a special character.
            </p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            {...register("photoURL")}
            type="url"
            placeholder="Photo URL"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center gap-5">
        <div className="text-yellow-600">
          Already registered?
          <Link to="/credentials/login"> Go to log in</Link>
        </div>
        <SocialLogin />
      </div>

      <Helmet>
        <title>Bistro Boss Restaurant | Sign Up</title>
      </Helmet>
    </aside>
  );
};

export default Register;
