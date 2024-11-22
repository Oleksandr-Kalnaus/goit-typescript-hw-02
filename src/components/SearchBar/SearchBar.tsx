import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { TbCameraSearch } from "react-icons/tb";
import css from "./SearchBox.module.css";
import { SearchBarProps } from "../../types/types";

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error("You must enter text to search for images");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.searchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          <TbCameraSearch className={css.icon} />
        </button>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </header>
  );
};

export default SearchBar;
