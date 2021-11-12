const Avatar = ({ image, className, style, alt }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} />
    </div>
  );
};

export default Avatar;