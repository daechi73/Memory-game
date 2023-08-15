import "../css/Card.css";
const Card = (props) => {
  return (
    <>
      <div className="card">
        <img
          className="card-img"
          src={props.url}
          alt={props.name}
          onClick={props.onClick}
          id={props.id}
        />
        <div className="catName">{props.name}</div>
      </div>
    </>
  );
};

export default Card;
