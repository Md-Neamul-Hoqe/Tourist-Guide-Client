import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  //   const axios = useAxiosPublic();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = () => {
    if (!loading && !user?.email) navigate("/credentials/login");

    reset();

    return Swal.fire({
      icon: "success",
      title: "Your message sent successfully.",
      showConfirmButton: false,
      timer: 1500,
    });

    // console.log(data);
    // const {
    //   email,
    //   password,
    //   name: displayName,
    //   photoURL,
    //   experiences,
    //   skills,
    //   education,
    //   phone,
    //   location,
    //   twitter,
    //   instagram,
    // } = data;
    // https://i.ibb.co/WFhJcTx/user-3.png
    // console.log({ email, password, name, photoURL });

    // axios
    //   .post("/users", userInfo)
    //   .then((res) => {
    //     if (res?.data?.insertedId) {
    //       // console.log("User photo updated.");

    //       reset();

    //       navigate(from, { replace: true });
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: `Database error: ${res?.data}.`,
    //         showConfirmButton: true,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return Swal.fire({
    //       icon: "warning",
    //       title: error.message,
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
    //   });
  };
  return (
    <section>
      <div className="px-10">
        <h2 className="text-xl font-mono font-semibold">General Inquiries</h2>

        {/* Know about us */}
        <div className="border rounded-lg p-5 mb-5">
          <p>
            For general inquiries about our services or destinations, please
            contact us via email or phone:
          </p>
          <address className="border-s-4 border-blue-700 ps-3 ms-10 m-5">
            <p>Email: info@dreamplace.com</p> <p>Phone: +1 (555) 123-4567</p>
          </address>
        </div>
        <div className="border rounded-lg p-5 mb-5">
          <p>
            Customer Support Our dedicated customer support team is available to
            assist you with any questions or concerns:
          </p>
          <address className="border-s-4 border-blue-700 ps-3 ms-10 m-5">
            <p>Email: support@dreamplace.com</p> <p>Phone: +1 (555) 987-6543</p>
          </address>
        </div>
        <div className="border rounded-lg p-5 mb-5">
          <p>
            Partnership Opportunities If you&apos;re interested in partnership
            opportunities or collaborations, please reach out to us:
          </p>
          <address className="border-s-4 border-blue-700 ps-3 ms-10 m-5">
            <p>Email: partnerships@dreamplace.com</p>{" "}
            <p>Phone: +1 (555) 876-5432</p>
          </address>
        </div>
      </div>

      {/* Meet with us */}
      <div className="px-10">
        <h2 className="text-xl font-mono font-semibold mt-10">
          Office Location
        </h2>
        <p>If you prefer to visit us or send mail, you can find us at:</p>

        <address className="border-s-4 border-blue-700 ms-10 m-5 ps-3">
          <p>Dream Place Tourist Guide Headquarters</p>
          <p>123 Main Street,</p>
          <p>Sylhet, Sylhet, ZIP Code: 3114 ,</p>
          <p>Bangladesh</p>
        </address>

        <h2 className="text-xl font-mono font-semibold mt-10">Office Hours</h2>
        <p>Our office is open during the following hours:</p>

        <address className="border-s-4 border-blue-700 ms-10 m-5 ps-3">
          <p>Monday to Friday: 9:00 AM to 5:00 PM (Local Time)</p>
          <p>Saturday: 10:00 AM to 2:00 PM (Local Time)</p>
          <p>Sunday: Closed</p>
        </address>
      </div>

      {/* Mail to us */}
      <form onSubmit={handleSubmit(onSubmitForm)} className="card-body">
        <h3 className="text-xl font-mono">
          Send from{" "}
          <span className="italic font-semibold hover:underline">
            {user?.email}
          </span>{" "}
          to{" "}
          <span className="italic font-semibold hover:underline">
            hoqe1997@gmail.com
          </span>
        </h3>
        <div className="w-full relative mb-10">
          <div className="form-control mt-5">
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="In short here"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-5">
            <label className="label">
              <span className="label-text">Message</span>
            </label>

            <textarea
              {...register("message", { required: true })}
              type="text"
              rows={10}
              placeholder="Write your message here..."
              className="textarea textarea-bordered"
            />
          </div>
          <div className="form-control my-5">
            <button className="btn btn-neutral px-7 py-4 absolute right-10 bottom-12">
              send
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
