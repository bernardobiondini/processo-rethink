import './style.css'

export function PersonCard(props) {


  return (

    <div className="person-card">
      <p title='Nome da pessoa' >{props.name}</p>
      {props.id && (
        <p>id = {props.id}</p>
      )}
      { props.age && (
        <p title='Idade da pessoa' >{props.age}</p>
      ) }
    </div>
  )
}