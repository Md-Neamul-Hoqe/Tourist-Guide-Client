import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex justify-center">
      <img
        className="w-full h-screen"
        src="https://i.ibb.co/x2WBZ6F/404.gif"
        alt="404"
      />
      <div className="absolute bottom-0 py-10 text-center">
        <p className="w-full py-2 text-xl font-mono text-red-700">
          Something Wrong!
        </p>
        <Link to="/" className="btn bg-blue-700 text-white">
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
