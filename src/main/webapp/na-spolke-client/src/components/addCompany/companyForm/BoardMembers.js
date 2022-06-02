import {forEach} from "react-bootstrap/ElementChildren";

const BoardMembers = (props) => {
  return<div>
    {props.boardMembers.map(member => (
    <div><label>Nazwisko</label>
    <input value={member.nazwisko.nazwiskoICzlon}/>
    <label>Imię</label>
    <input value={member.imiona.imie}/>
      <label>Drugie imię</label>
      <input value={member.imiona.imieDrugie}/>
      {/*<label>Funkcja:</label>*/}
      {/*<input value={member.funkcjaWOrganie}/>*/}
    </div>
        ))
}
  </div>
}
export default BoardMembers;