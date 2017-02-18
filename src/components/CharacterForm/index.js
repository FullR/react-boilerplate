import {React, Component} from "component";
import {Input} from "rebass";
import {connect} from "react-redux";
import {characters} from "store/actions";
import style from "./style.css";

@connect(
  ({characters}, {characterId}) => characters.find((character) => character.id === characterId),
  (dispatch) => ({
    onUpdateField: characters.updateField.dispatcher(dispatch)
  })
)
export default class CharacterForm extends Component {
  handleChangeName = (event) => this.props.onUpdateField("name", event.target.value);
  handleChangeAge = (event) => this.props.onUpdateField("age", parseInt(event.target.value));
  render() {
    const {character, onUpdateField} = this.props;
    const {name, age} = character;

    return (
      <div className={style.root}>
        <Input value={name} onChange={onU}/>
      </div>
    );
  }
}
