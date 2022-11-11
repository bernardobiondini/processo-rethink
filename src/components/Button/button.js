import './style.css'

export function Button(props) {
  
  return(
    <button onClick={props.handleClick} className="buttom-comp">{props.buttonName}</button>
  )
}