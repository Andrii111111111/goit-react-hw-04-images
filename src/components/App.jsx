
import { useState, useEffect } from "react";
import { Form } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as GetInfo from './GetInfo/GetInfo'
import { But } from "./Button/Button.styles";
import { Audio } from 'react-loader-spinner'
import { Loading } from './Loader/Loader.styles'
import { ImageGallery } from "./ImageGallery/ImageGallery";



export const App =()=> {

  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [data, setData] = useState('')
  const [buttonVisible, setButtonVisible] = useState(false)
  const [loading, setLoading] = useState(false)
 

  useEffect(() => {
   setLoading(true);
    try {
      const getImage = async () => {
        
         const images = await GetInfo.getImages(data, page);
       
         setImages((prevImages) =>
           [...prevImages, ...images.hits],
           setButtonVisible(page < Math.ceil(images.totalHits / 12)));
        
         if ((page === 1) & (images.totalHits === 0)) {
           toast.error(
             `Sorry, there are no images matching your search ${data}. Please try again.`
           );
         }
       };
       if (data.length !== 0) {
         getImage()
       }
        }
     catch (error) {
      console.log('Error');
    }
     finally { setLoading(false) }
    
  }, [data, page]);
  
  
  
  const getData = data => {
    setImages([])
    setPage(1)
    setData(data)
  }
 
   const  buttonClick = () => {
    setPage((prevPage) => prevPage + 1 );
  };
  
  
  return (
    <>
      <Form onSubmit={getData} />
      <ToastContainer />
      {loading && (<Loading><Audio/></Loading>)}
        <ImageGallery images={images} />
          {buttonVisible && (
      <But type="button" onClick={buttonClick}>Load more</But>
      )}
    </>)
}


