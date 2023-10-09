import axios from "axios";


const blogFetch = axios.create({
    baseURL:"https://localhost:7099/api",
    
})

export default blogFetch;