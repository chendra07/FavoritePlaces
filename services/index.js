import axios from "axios";
// import { BASE_URL } from "@env";

const BASE_URL = "";

const renderHeaders = async (uploadFile, token) => {
  if (token) {
    return {
      "Content-Type": uploadFile ? "multipart/form-data" : "application/json",
      Authorization: token,
    };
  }
  return {
    "Content-Type": uploadFile ? "multipart/form-data" : "application/json",
  };
};

const Get = async (baseurl, path, responseType) => {
  const headers = await renderHeaders();
  const promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      baseURL: `${baseurl ? baseurl : BASE_URL}`,
      url: `${path}`,
      headers,
      responseType,
    })
      .then((res) => {
        // console.log("res: ", res);
        resolve(res);
      })
      .catch((err) => {
        // console.log("err: ", err);
        reject(err);
      });
  });
  return promise;
};

const Post = async (baseurl, path, request, uploadFile) => {
  const headers = await renderHeaders(uploadFile);
  const promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      baseURL: `${baseurl ? baseurl : BASE_URL}`,
      url: `${path}`,
      data: request,
      headers,
    })
      .then((res) => {
        // console.log("res: ", res);
        resolve(res);
      })
      .catch((err) => {
        // console.log("err: ", err);
        reject(err);
      });
  });
  return promise;
};

const Put = async (baseurl, path, request) => {
  const headers = await renderHeaders();
  const promise = new Promise((resolve, reject) => {
    axios({
      method: "put",
      baseURL: `${baseurl ? baseurl : BASE_URL}`,
      url: `${path}`,
      data: request,
      headers,
    })
      .then((res) => {
        // console.log("res: ", res);
        resolve(res);
      })
      .catch((err) => {
        // console.log("err: ", err);
        reject(err);
      });
  });

  return promise;
};

const Delete = async (baseurl, path, request) => {
  const headers = await renderHeaders();
  const promise = new Promise((resolve, reject) => {
    axios({
      method: "delete",
      baseURL: `${baseurl ? baseurl : BASE_URL}`,
      url: `${path}`,
      data: request,
      headers,
    })
      .then((res) => {
        // console.log("res: ", res);
        resolve(res);
      })
      .catch((err) => {
        // console.log("err: ", err);
        reject(err);
      });
  });
  return promise;
};

const Services = {
  Get,
  Post,
  Put,
  Delete,
};

export default Services;
