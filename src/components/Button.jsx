import "../css/Button.css";

const Button = (props) => {
  const handleStartBtnClick = () => {
    props.setGameStart(true);
    props.audio.play();
  };
  return (
    <button className="startBtn" onClick={handleStartBtnClick}>
      Start Game
    </button>
  );
};
export default Button;
