import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import PageNotFoundImage from "../../../public/img/PageNotFound.jpg";

function NotFoundPage() {
  return (
    <>
      <div className={css.NotFoundPage}>
        <img
          className={css.imgNotFoundPage}
          src={PageNotFoundImage}
          alt="404 - Not Found"
        />
        <Link className={css.goBackBtn} to="/">
          Go to Home
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
