import classes from "./Album.module.css";

export const Album = ({ title, onClick }) => {
  return (
    <div className={classes.container} onClick={onClick}>
      <h2>Title: {title}</h2>
    </div>
  );
};