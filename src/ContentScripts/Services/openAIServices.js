import axios from "axios";
import { APIConfig, Routes } from "../config";

const token = APIConfig.Token;

const summarize = (scrappedText) => {
  const body = {
    text: scrappedText,
  };
  return axios.post(`${APIConfig.URL}${Routes.summarize}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

const describeImage = (imageUrl) => {
  const body = {
    URL: imageUrl,
  };
  return axios.post(`${APIConfig.URL}${Routes.describeImage}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const openAiServices = {
  summarize,
  describeImage,
};
