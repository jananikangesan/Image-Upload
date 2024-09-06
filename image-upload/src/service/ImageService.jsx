import axios from "axios";

const URL="http://localhost:8088/image";

export const uploadImage=(file)=>{
    return axios.post(URL+"/fileSystem",file);
}

export const getImage=()=>{
    return axios.get(URL+"/showAll");
}

// export const downloadImage=(filename)=>{
//     return axios.get(URL+`/downloadFile/${filename}`);
// }

export const downloadImage = (filename) => {
    return axios.get(`${URL}/downloadFile/${filename}`, { responseType: 'arraybuffer' });
  };