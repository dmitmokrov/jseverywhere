import { useEffect } from "react";

export default function Favorites() {
  useEffect(() => {
    document.title = "My Notes — Favorites";
  });

  return (
    <div>
      <p>These are my favorites</p>
    </div>
  );
}
