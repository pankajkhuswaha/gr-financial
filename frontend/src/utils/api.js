import axios from "axios";
import { config } from "./axiosconfig";
import { base_url } from "./baseUrl";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase";
import { toast } from "react-toastify";

// todo old code ---------------------------
// export const uploadDoc = async (data) => {
//   const formData = new FormData();
//   formData.append("images", data);
//   const response = await axios.post(`${base_url}upload`, formData, config);
//   return response;
// };

export const uploadDoc = (data) => {
  return new Promise((resolve, reject) => {
    const file = data;
    const fileAdress = ref(storage, `finance/${data.name}`);
    const uploadTask = uploadBytesResumable(fileAdress, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            toast.error("Uploading is Paused");
            break;
          default:
            break;
        }
        if (process === 100) {
          toast.info(`File uploading is ${process}% done.`);
        }
      },
      (err) => {
        reject(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // console.log(downloadURL);
            resolve(downloadURL);
          })
          .catch((err) => {
            reject(err);
          });
      }
    );
  });
};


export const getAllCustomer = async () => {
  const response = await axios.get(`${base_url}customer`, config);
  return response.data;
};

export const deleteCustomer = async (data) => {
  console.log(config)
  const response = await axios.delete(`${base_url}customer/${data._id}`,config);
  return response.data;
};

export const addCustomer = async (data) => {
  const response = await axios.post(`${base_url}customer/add`, data, config);
  return response.data;
};
export const updateCustomer = async (data) => {
  const response = await axios.put(`${base_url}customer`, data, config);
  return response.data;
};

export const verifyUserLogin = async (data) => {
  const response = await axios.post(`${base_url}user/verify`, data, config);
  return response.data;
};

export const getallNotification = async (data) => {
  const response = await axios.get(`${base_url}customer/reminder`, config);
  return response.data;
};

export const getallUsers = async (data) => {
  const response = await axios.get(`${base_url}user/all-users`, config);
  return response.data;
};

export const assignCustomers = async (data) => {
  const response = await axios.post(`${base_url}customer/assign`, data,config);
  return response.data;
};
export const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data,
    config
  );
  return response.data;
};

export const resetUserPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data.password }
  );
  return response.data;
};

export const CheckResetPasswordUser = async (data) => {
  const response = await axios.get(`${base_url}user/reset-password/${data.token}`);
  return response.data;
};

