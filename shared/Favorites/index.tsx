import { useState } from "react";
export interface FavoriteProps {
  disable?: boolean;
}
const FavoriteStar: React.FC<FavoriteProps> = ({ disable }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    setIsFavorited((prev) => !prev); // Toggle between filled and outlined states
  };

  return (
    <div
      className={`${
        disable ? "grayscale" : "grayscale-0"
      }  w-fit relative flex items-center justify-center cursor-pointer`}
      onClick={disable ? () => {} : handleClick}
    >
      {/* Star with outline */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke=" rgb(37 99 235)"
        className={`w-6 h-6 transition-all duration-400 ease-in-out ${
          isFavorited ? "scale-100" : "scale-100 fill-none"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>

      {/* Filled star (fill in / fill out effect) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill=" rgb(37 99 235)"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke=" rgb(37 99 235)"
        className={`absolute transition-all duration-500 ease-in-out ${
          isFavorited ? "w-6 h-6 scale-100" : "w-6 h-6 scale-0"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </div>
  );
};

export default FavoriteStar;
