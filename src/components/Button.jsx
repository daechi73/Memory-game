const Button = (props) => {
  const handleStartBtnClick = () => {
    props.setGameStart(true);
    props.audio.play();
  };
  return <button onClick={handleStartBtnClick}>Start Game</button>;
};
export default Button;
