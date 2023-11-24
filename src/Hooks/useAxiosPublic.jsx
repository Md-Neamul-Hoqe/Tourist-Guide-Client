import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "",
  // withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
