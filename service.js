import axios from "axios";
import { baseApiUrl } from "./defaultvalues";

const createInstance = function () {
  const token = localStorage.getItem("x-access-token");
  const axiosInstance = axios.create({
    baseURL: baseApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return axiosInstance;
};

export const Service = {
  createAlarm: function (payload) {
    return new Promise(function (resolve, reject) {
      const axiosInstance = createInstance();
      axiosInstance
        .post("/alarms", payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error); // Better error logging
          reject(error);
        });
    });
  },

  deleteAlarm: function (payload) {
    return new Promise(function (resolve, reject) {
      const axiosInstance = createInstance();
      axiosInstance
        .post("/alarms/:id", payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error); // Better error logging
          reject(error);
        });
    });
  },

  snoozeAlarm: function (payload) {
    return new Promise(function (resolve, reject) {
      const axiosInstance = createInstance();
      axiosInstance
        .post("/alarms/:id/snooze", payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error); // Better error logging
          reject(error);
        });
    });
  },

  getAlarms: function (payload) {
    return new Promise(function (resolve, reject) {
      const axiosInstance = createInstance();
      axiosInstance
        .post("/alarms", payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error); // Better error logging
          reject(error);
        });
    });
  },
};
