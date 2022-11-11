

import { useEffect, useState } from 'react';

import { PersonCard } from './components/PersonCard/personCard';
import { Button } from './components/Button/button';
import { BsSearch } from "react-icons/bs"

import './style.css';

function App() {

  const [ personName, setPersonName ] = useState("");
  const [ personAge, setPersonAge ] = useState(0);
  const [ personJob, setPersonJob ] = useState("");
  const [ personEmail, setPersonEmail ] = useState("");
  const [ personPhone, setPersonPhone ] = useState("");
  const [ searchedPersonName, setSearchedPersonName ] = useState("");
  const [ searchedPerson, setSearchedPerson ] = useState({});
  const [ returnedNames, setReturnedNames ] = useState([]);
  const [ pessoasHabilitadas, setPessoasHabilitadas ] = useState([]);
  const [ mediaIdades ,setMediaIdades] = useState(0);
  const [ pessoas, setPessoas ] = useState([ 
    {
      name: "Fabiana Araújo",
      age: 33
    },
    {
      name: "Gabriel Gomes",
      age: 25 
    },
    {
      name: "Fernando Henrique",
      age: 17
    },
    {
      name: "Ana Luiza",
      age: 2
    }

  ]);

  function handleSubmitForm(e) {
    e.preventDefault();
    
    const newPerson = {
      name: personName,
      age: personAge
    }
    
    setPessoas( oldArray => [...oldArray, newPerson]);
    addIdToEachPerson();

    document.getElementById("person-form").reset();
  }

  function addIdToEachPerson() {
    let id = 1;

    pessoas.forEach( pessoa => {
      pessoa.id = id++;
    });
  }

  function handleSearchPerson(e) {
    e.preventDefault();

    pessoas.forEach( pessoa => {
        if(pessoa.name == searchedPersonName) setSearchedPerson(pessoa)
    })

  }

  function handleReturnNames(e) {
    e.preventDefault();
    setReturnedNames([]);

    pessoas.forEach( pessoa => {
      let i = 0;
      for( i = 0; i < pessoa.name.length; i++) {
        if(pessoa.name[i] == " ") break;
      }

      setReturnedNames(oldArray => [...oldArray, pessoa.name.slice(0, i)]);
    })
  }

  function handleHabilitadas(e) {
    e.preventDefault();
    setPessoasHabilitadas([]);

    pessoas.forEach( pessoa => { 
      if(pessoa.age >= 18) setPessoasHabilitadas(oldArray => [...oldArray, pessoa]);
    })
  }

  function handleMediaIdades(e) {
    e.preventDefault();
    setMediaIdades(0);
    let soma = 0;

    pessoas.forEach( pessoa => { 
      soma += pessoa.age;
    })

    setMediaIdades(soma/pessoas.length);
  }


  // decidi criar a funcao de colocar os id's dentro do useEffect pois dessa
  // forma o map consegue ter uma key para cada personCard, uma vez que o React
  // exige uma key para cada elemento

  addIdToEachPerson();

  useEffect( () => {
    addIdToEachPerson();
  }, [pessoas, addIdToEachPerson] )

  return (
    <main>
      <section id='form-peoplecontainer'>
        <div className='container'>
          <h1>Pessoas Cadastradas</h1>
          <div className='people-container'>
            { pessoas.map( pessoa => (
              <PersonCard 
              key={pessoa.id}
              name={pessoa.name}
              age={pessoa.age}
            />
            ) ) }
          </div>
        </div>
      </section>

      <section>
        <form id="person-form" onSubmit={handleSubmitForm} >

          <label htmlFor="person-name">Nome:</label>
          <input id='person-name' name='person-name' type="text" form='person-form' required
          onChange={(e) => setPersonName(e.target.value)}
          />

          <label htmlFor="person-age">Idade:</label>
          <input id="person-age" name='person-age' type="number" form='person-form' required
          onChange={(e) => setPersonAge(e.target.valueAsNumber)}
          />

          <label htmlFor="person-job">Profissão:</label>
          <input id="person-job" name='person-job' type="text" form='person-form' required
          onChange={(e) => setPersonJob(e.target.value)}
          />

          <label htmlFor="person-email">Email:</label>
          <input id="person-email" name='person-email' type="email" form='person-form' required
          onChange={(e) => setPersonEmail(e.target.value)}
          />

          <label htmlFor="person-number">Telefone:</label>
          <input id="person-number" name='person-number' type="text" form='person-form' pattern="\([1-9]{2}\) 9 [0-9]{4}-[0-9]{4}" required
          onChange={(e) => setPersonPhone(e.target.value)}
          />

          {/* <button type='submit' form='person-form' >Cadastrar</button> */}
          <Button 
            type='submit' form='person-form'
            buttonName="Cadastrar"
          />
        </form>
      </section>


      <section className='functions-container'>
        <div className='search-container'>
          <div>
          <input placeholder='Pesquise por alguma pessoa' type="search" name="search-person" id="search-person" 
          onChange={(e) => setSearchedPersonName(e.target.value)}
          />
          <button onClick={handleSearchPerson} ><BsSearch /></button>
          </div>
          { searchedPerson.name  && (
            <PersonCard 
              name={searchedPerson.name}
              age={searchedPerson.age}/>
          ) }
        </div>
        <div className='names-container'>
          <Button
            handleClick={handleReturnNames}
            buttonName="Retorna nomes"
          />
          {returnedNames.map(name => (
            <PersonCard 
            name={name}/>
          ))}
        </div>

        <div className='pessoas-id-container'>
          <Button
            handleClick={addIdToEachPerson}
            buttonName="Pessoas com seus Id's"
          />
          {pessoas.map(pessoa => (
            <PersonCard 
            key={pessoa.id}
            name={pessoa.name}
            id={pessoa.id}
            age={pessoa.age}
            />
          ))}
        </div>

        <div className='pessoas-habilitadas'>
          <Button
            handleClick={handleHabilitadas}
            buttonName="Retorna quem pode tirar habilitação"
          />
          {pessoasHabilitadas.map(pessoa => (
            <PersonCard 
              key={pessoa.id}
              name={pessoa.name}
              id={pessoa.id}
              age={pessoa.age}/>
          ))}
        </div>
        <div className='media-idades'>
          <Button
            handleClick={handleMediaIdades}
            buttonName="Retorna a média de idades"
          />
          <p>Média = {mediaIdades}</p>
        </div>
      </section>
    </main>
  );
}

export default App;
