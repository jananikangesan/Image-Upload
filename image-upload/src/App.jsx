import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { downloadImage, getImage, uploadImage } from './service/ImageService';
import { useNavigate } from 'react-router-dom';

function App() {
 
  const [pic,setPic]=useState(null);
  
  const [viewPic,setViewPic]=useState(null);
  const [newImg,setNewImg]=useState([]);


  useEffect(()=>{
    getImage().then((response)=>{
      console.log(response.data);
      setNewImg(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  const handleDownload = (filename) => {
    //console.log(filename);
    downloadImage(filename)
      .then((response) => {
        // Create a Blob from the response
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;  // Set the file name for download
        link.click();  // Trigger the download

        // Cleanup the URL object after download
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };


  const handleFileChange = (e) => {
    //console.log(e.target.files.length)
    // Ensure a file is selected
    if (e.target.files && e.target.files.length > 0) {
      setPic(e.target.files[0]);
      setViewPic(URL.createObjectURL(e.target.files[0])); // Store the file name in the state
      
    }
   
  };

  const submitProducts=(e)=>{
    e.preventDefault();
    console.log(e);

    if (!pic) {
      console.error("No file selected.");
      return;
    }


    const formData = new FormData();
    formData.append("image", pic);
   
    uploadImage(formData).then((response)=>{
        console.log(response.data);    
       
    }).catch((error) => {
      console.error("Error uploading file:", error);
    });
}

  return (
    <>
      <div>
          <form>
            <input type="file" name="pic"  onChange={handleFileChange} />
            <div>{viewPic && <img src={viewPic} alt="image" width="100" height="100"/>}</div>
            <button type="submit" onClick={submitProducts}>save</button>
          </form>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
              {newImg.map((item,index)=>(
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td><img src={`image/${item.name}`} alt={item.name} width="100" height="100" /></td>
                  <td><button onClick={()=>handleDownload(item.name)}>+</button></td>
                </tr>
              )   
              )}
          </tbody>


        </table>
      </div>
    </>
  )
}

export default App
