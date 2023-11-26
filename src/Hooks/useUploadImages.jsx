import PropTypes from "prop-types";
const image_upload_key = import.meta.env.VITE_image_upload_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const useUploadImages = (fileList) => {
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
      .then((data) => {
        resolve(data.data.url); 
      })
      .catch((error) => {
        reject(error);
      });
  });
};



useUploadImages.propTypes = {
    fileList: PropTypes.array,
  };
  
  export default useUploadImages;