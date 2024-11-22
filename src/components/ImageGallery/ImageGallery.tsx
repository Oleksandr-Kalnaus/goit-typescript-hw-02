import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageGalleryProps } from "../../types/types";

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageCards,
  onImageClick,
  cardRef,
}) => {
  return (
    <ul className={css.gallery}>
      {imageCards.map((imageCard, index) => (
        <li key={imageCard.id} className={css.galleryItem}>
          <ImageCard
            imageCard={imageCard}
            onImageClick={onImageClick}
            cardRef={index === 0 ? cardRef : null}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
