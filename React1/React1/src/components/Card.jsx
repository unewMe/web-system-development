const Card = ({ title, description, image }) => {
  return (
    <>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          maxWidth: "300px",
        }}
      >
        {image && (
          <img
            src={image}
            alt={title}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        )}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Card;
