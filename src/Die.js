export default function Die(props) {
  const styleClass = props.isHeld ? " isHeld" : ""
  const dots = [...Array(props.value)].map((elementInArray, index) => ( 
    <span className={`dot dot-${index + 1}`} key={index}></span> 
    ) 
)
  return (
    <div onClick={props.holdDice} className={`game__item${styleClass} game__item-${props.value}`} >
      {dots}
    </div>
  )
}