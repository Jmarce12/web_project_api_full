export default function InfoTooltip(props) {
  const { message, image } = props;
  return (
    <>
      {image && (
        <img src={image} alt="Info" className="popup__registered-image" />
      )}
      <p className="popup__message">{message}</p>
    </>
  );
}
