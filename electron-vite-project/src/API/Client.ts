import axios from "axios";
import { BASE_URL } from "@/constant/config";

const Client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default Client
