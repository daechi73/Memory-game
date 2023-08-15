import "../css/Card.css";
const Card = (props) => {
  return (
    <>
      <div className="card" id={props.id} onClick={props.onClick}>
        <img className="card-img" src={props.url} alt={props.name} />
        <div className="catName">{props.name}</div>
      </div>
    </>
  );
};

export default Card;
