const Avatar = ({ image, className, alt }) => {
  return (
    <div className={`avatar ${className}`}>
      <img src={image} alt={alt} />
    </div>
  );
};

export default Avatar;
