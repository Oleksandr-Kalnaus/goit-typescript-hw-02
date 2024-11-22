import css from "./ImageCard.module.css";
import { ImageCardProps } from "../../types/types";

const ImageCard: React.FC<ImageCardProps> = ({
  imageCard,
  onImageClick,
  cardRef,
}) => {
  const { smallImage, regularImage, description, likes, dateOfCreate } =
    imageCard;

  const handleClick = () => {
    onImageClick({ regularImage, description, likes, dateOfCreate });
  };

  return (
    <div className={css.imageCard} onClick={handleClick} ref={cardRef}>
      <img src={smallImage} alt={description} className={css.image} />
    </div>
  );
};

export default ImageCard;
