import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://tourist-guide-server.vercel.app/api/v1",
  withCredentials: true,
});

/* TODO: use interceptors */

const useAxiosHook = () => {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();
  // console.log(location);
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      //console.log("response: ", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        console.error(err?.response?.status, err?.response?.data?.message);

        await userSignOut()
          .then((res) => {
            console.log(res);
            
            Swal.fire({
              icon: "error",
              title: `${err?.response?.status}: ${err?.response?.data?.message}`,
              showConfirmButton: true,
            });
          })
          .catch((err) => console.log(err));

        navigate("/credentials/login");
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosHook;
