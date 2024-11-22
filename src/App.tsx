import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";
import apiRequests from "../utils/apiRequests";

import "modern-normalize";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const imageCardRef = useRef(null);

  const onSubmit = (searchQuery) => {
    if (searchQuery === query) return;
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    if (query === "") return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const { images: fetchedImages, total } = await apiRequests(query, page);

        if (fetchedImages.length === 0) {
          setError("No images found.");
          return;
        }

        setImages((prevImages) => [...prevImages, ...fetchedImages]);
        setTotalImages(total);
      } catch (err) {
        setError(`Failed to fetch images. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (imageCardRef.current) {
      const cardHeight = imageCardRef.current.clientHeight || 0;
      const scrollPosition = window.pageYOffset + cardHeight * 3;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [images]);

  const loadMoreImages = () => {
    if (images.length >= totalImages) return;
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery
          imageCards={images}
          onImageClick={openModal}
          cardRef={imageCardRef}
        />
      )}

      {loading && <Loader />}

      {images.length > 0 && !loading && images.length < totalImages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage.regularImage}
          altText="Selected large image"
          description={selectedImage.description}
          likes={selectedImage.likes}
          dateOfCreate={selectedImage.dateOfCreate}
        />
      )}
    </>
  );
}
