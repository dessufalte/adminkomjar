import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoSearch } from "react-icons/io5";

function SearchBarInput() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="outline-none p-2 px-12 py-3 text-black bg-gray-200 rounded-xl focus:bg-white transition-all ease-out"
        placeholder="Temukan sesuatu..."
      />
      <IoSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
}
export default SearchBarInput;
