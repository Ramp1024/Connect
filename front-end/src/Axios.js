import axios from "axios";

const instance = axios.create({
  baseURL: "https://ancient-tor-83813.herokuapp.com",
});
export default instance;
