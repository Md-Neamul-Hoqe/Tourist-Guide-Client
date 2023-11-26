import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useUploadImages from "../../../../Hooks/useUploadImages";
const image_upload_key = import.meta.env.VITE_image_upload_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const AddPackage = () => {
  const axios = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = async (data) => {
    // console.log(data);
    const { type, title, price, description, images, thumbnail } = data;
    console.log(images);
    const imageURLs = UploadImages(images);

    console.log({
      type,
      title,
      price,
      description,
      images,
      thumbnail,
    });

    const packageInfo = {
      type,
      title,
      price,
      description,
      images: imageURLs,
      thumbnail,
    };

    // axios.post("/users", packageInfo).then((res) => {
    //     if (res?.data?.insertedId) {
    //       // console.log("User photo updated.");

    //       Swal.fire({
    //         icon: "success",
    //         title: "User profile updated successfully.",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });

    //       reset();
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: `Database error: ${res?.data}.`,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   });
  };

  return (
    <aside className="py-5">
      <h1 className="text-5xl font-bold text-center">Add a New Package</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <input
            {...register("type")}
            type="text"
            placeholder="Type"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            {...register("price")}
            type="number"
            placeholder="Price"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            {...register("description")}
            type="text"
            placeholder="package description"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scenario Images</span>
          </label>
          <input
            {...register("images")}
            type="file"
            multiple
            placeholder="Scenario Images"
            className="file-input file-input-bordered file-input-info"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Thumbnail</span>
          </label>
          <input
            {...register("thumbnail")}
            type="file"
            multiple
            placeholder="Cover Photo URL"
            className="file-input file-input-bordered file-input-info"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Add Package
          </button>
        </div>
      </form>

      <Helmet>
        <title>Bistro Boss Restaurant | Add Package</title>
      </Helmet>
    </aside>
  );
};

const UploadImages = (fileList) => {
  console.log(fileList);
  const promises = [];
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileDataUrl = event.target.result;
        uploadToImageBB(file)
          .then((imageUrl) => {
            resolve({ file: fileDataUrl, imageUrl });
          })
          .catch((error) => {
            reject(error);
          });
      };

      reader.readAsDataURL(file);
    });

    promises.push(promise);
  }

  return Promise.all(promises);
};

// Function to upload a single file to ImageBB
const uploadToImageBB = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return new Promise((resolve, reject) => {
    fetch(image_hosting_api, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${image_upload_key}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        return response.json();
      })
      .then(async (data) => {
        await wait(1);
        resolve(data.data.url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const wait = (delaySeconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delaySeconds * 1000);
  });
};

export default AddPackage;
