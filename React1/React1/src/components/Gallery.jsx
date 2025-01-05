const Gallery = ({ images }) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
