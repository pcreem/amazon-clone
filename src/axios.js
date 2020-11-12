import axios from "axios";

const instance = axios.create({
  baseURL:  "https://amazon-mini-api.herokuapp.com/",
});

export default instance;


