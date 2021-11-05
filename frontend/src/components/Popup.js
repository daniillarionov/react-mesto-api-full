import { useEffect } from "react";
function Popup({ isOpen, onClose, className, children }) {
  const classList = ["popup"];
  if (isOpen) classList.push("popup_opened");
  if (className) classList.push(className);
  const classes = classList.join(" ");

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.target.classList.contains("popup_opened")) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleEscClose);
    };
  }, [isOpen]);

  return <div className={classes}>{children}</div>;
}
export default Popup;
