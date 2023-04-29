import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'services/images-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppContainer } from './App.styled';

export const App = function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  // const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

 
  useEffect(() => {
    if (query === '') {
      return;
    }
   
    setIsLoading(true);
    fetchImages(query, page)
      .then(res => {
        const imagesArray = res.hits.map(hit => {
          return {
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          };
        });
        setImages(prev => [...prev, ...imagesArray]);
        setImagesOnPage(prev => prev + imagesArray.length);
        setTotalImages(res.totalHits);
        if (res.totalHits === 0) {
          setIsLoading(false);
          throw new toast.error('Change the name and try again!');
        }
      })
      .catch(error => {
        
        toast.error('Something went wrong!');
        
        setIsLoading(false);
      })
      .finally(() => setIsLoading(prev => !prev));
  }, [query, page]);

  const getSearchRequest = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onNextFetch = () => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };
  
  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      return (
        setShowModal(!showModal),
        setCurrentImageUrl(currentImageUrl),
        setCurrentImageDescription(currentImageDescription)
      );
    }
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}

      <ToastContainer/>
    </AppContainer>
  );
}