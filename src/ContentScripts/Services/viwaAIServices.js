import axios from "axios";
import { APIConfig, Routes } from "../config";

const token = APIConfig.Token;

export const sendVoiceCommand = (speechTranscript) => {
  return axios.post(
    `${APIConfig.URL}${Routes.voiceCommand}`,
    speechTranscript,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
