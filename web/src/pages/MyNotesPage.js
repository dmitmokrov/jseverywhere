import { useEffect } from "react";

const MyNotesPage = () => {
  useEffect(() => {
    document.title = "My Notes — Notedly";
  });

  return (
    <div>
      <p>These are my notes</p>
    </div>
  );
};

export default MyNotesPage;
