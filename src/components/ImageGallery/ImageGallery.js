import { ImageList, ListComponent } from './ImageGallery.styled';
import ModalImage from 'react-modal-image';

export const ImageGallery = ({ images }) => {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ListComponent key={id}>
          {<ModalImage small={webformatURL} large={largeImageURL} alt={tags} />}
        </ListComponent>
      ))}
    </ImageList>
  );
};
