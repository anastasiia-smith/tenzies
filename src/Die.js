export default function Die(props) {
  const styleClass = props.isHeld ? " isHeld" : ""
  return (
    <div onClick={props.holdDice} className={`game__item${styleClass}`} >
      <h2 className="game__num">{props.value}</h2>
    </div>
  )
}