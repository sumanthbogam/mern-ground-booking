import axios from "axios";

const Axios = axios.create({
    baseURL: "https://groundbooking-backend.onrender.com/api"  
});

export default Axios;
