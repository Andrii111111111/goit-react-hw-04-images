
import { Component } from "react";
import { Form } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as GetInfo from './GetInfo/GetInfo'
import { But } from "./Button/Button.styles";
import { Audio } from 'react-loader-spinner'
import { Loading } from './Loader/Loader.styles'
import { ImageGallery } from "./ImageGallery/ImageGallery";



export class App extends Component {

  state = {
    images: [],
    page: 1,
    data: '',
    buttonVisible: false,
    loading: false,
  }
  
  componentDidUpdate(_, prevState) {
    if (
      prevState.data !== this.state.data ||
      this.state.page !== prevState.page
    ) {
      this.getImages();
    }
  }


  getImages = async () => {
    const { page, data } = this.state
    
     try {
      this.setState({ loading:true })
      const images = await GetInfo.getImages(data,page);
       
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        buttonVisible: page < Math.ceil(images.totalHits / 12),}));
       
    if ((page === 1) & (images.totalHits === 0)) {
      toast.error(
        `Sorry, there are no images matching your search ${data}. Please try again.`
      );
    }
    } catch (error) {
      console.log('Error');
    }
    finally { this.setState({ loading: false })}
  };

  getData = data => {
    this.setState({
    images: [], page:1, data:data });
  }
 
  buttonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
};
  
  render() {
  
  return (
    <>
      <Form onSubmit={this.getData} />
      <ToastContainer />
         {this.state.loading && <Loading><Audio/></Loading> }
      <ImageGallery images={ this.state.images } />
         {this.state.buttonVisible && (
      <But type="button" onClick={this.buttonClick}>Load more</But>
      )}
    </>)
}
}