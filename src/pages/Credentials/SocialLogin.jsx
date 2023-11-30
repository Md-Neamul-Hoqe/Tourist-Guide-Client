import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const SocialLogin = () => {
  const axios = useAxiosPublic();
  const navigate = useNavigate();
  const { googleSignInUser, setError } = useAuth();

  const handleGoogleSignIn = () => {
    // console.log(event.target);
    // event.preventDefault();
    // console.log("object");

    googleSignInUser()
      .then(({ user }) => {
        // console.log("Firebase result: ", user);

        const userInfo = {
          name: user?.displayName,
          role: "tourist",
          profilePicture: user?.photoURL,
          contactDetails: {
            email: user?.email,
            phone: user?.phoneNumber,
          },
          from: user?.metadata?.creationTime || new Date(),
        };

        axios
          .post("/create-user", userInfo)
          .then(({ data }) => {
            // console.log("Database result: ", data);

            data?.message
              ? setTimeout(() => {
                  Swal.fire({
                    icon: "success",
                    title: data?.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }, 1000)
              : !data?.insertedId &&
                Swal.fire({
                  icon: "success",
                  title: "User profile updated successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });

            return navigate("/");
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: error?.message,
              showConfirmButton: true,
            })
          );
      })
      .catch((error) => {
        setError(error);
        Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <>
      <div>Or sign in with</div>
      <div className="flex justify-center gap-5">
        <Link className="rounded-full p-3 border border-black text-black hover:opacity-70">
          <FaFacebookF />
        </Link>
        <Link
          onClick={handleGoogleSignIn}
          className="rounded-full p-3 border border-black text-black hover:opacity-70">
          <FaGoogle />
        </Link>
        <Link className="rounded-full p-3 border border-black text-black hover:opacity-70">
          <FaGithub />
        </Link>
      </div>
      <div className="divider "></div>
      <Link to="/" className="btn btn-sm bg-orange-600 text-white">
        Go Home
      </Link>
    </>
  );
};

export default SocialLogin;
