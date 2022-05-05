import { useEffect } from "react";

const FavoritesPage = () => {
  useEffect(() => {
    document.title = "My Notes — Favorites";
  });

  return (
    <div>
      <p>These are my favorites</p>
    </div>
  );
}

export default FavoritesPage;
