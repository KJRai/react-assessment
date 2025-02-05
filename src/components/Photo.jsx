import classes from "./Photo.module.css";

export const Photo = ({ title, url }) => {
  return (
    <div className={classes.container} style={{
      backgroundColor: "#316f7e",
    }}>
      <img src={url} className={classes.image} alt={title} />
      <p className={classes.caption}>{title}</p>
    </div>
  );
};