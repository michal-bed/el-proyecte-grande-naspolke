import {forEach} from "react-bootstrap/ElementChildren";
import {BoardMember} from "../../../classes/persons/BoardMember";

const MembersCompanyBodies = (props) => {

  if(props.boardMembers.length===0) {
    return <div>Brak członków!</div>
    //TODO przemyśleć sytuacje braku zarządu
  }

  function displayMemberFunction(member){
    if(member instanceof BoardMember){
      return <div>
        <label>Funkcja:</label>
        <input defaultValue={member.MemberFunction}/>
      </div>
    }
  }

  function checkForSecondSurname(SecondSurname){
    if(SecondSurname){
      return<div>
        <label>Drugi Człon:</label>
        <input defaultValue={SecondSurname}/>
      </div>
    }
  }

  function checkForSecondName(SecondName){
    if(SecondName){
      return<div>
        <label>Drugie Imię:</label>
        <input defaultValue={SecondName}/>
      </div>
    }
  }


  return<div>
    {props.boardMembers.map(member => (
    <div><label>Nazwisko pierwszy człon</label>
      <input defaultValue={member.LastNameI}/>

      {checkForSecondSurname(member.LastNameII)}

      <label>Pierwsze Imię:</label>
      <input defaultValue={member.FirstName}/>

      {checkForSecondName(member.SecondName)}

      {displayMemberFunction(member)}
    </div>
        ))
}
  </div>
}
export default MembersCompanyBodies;