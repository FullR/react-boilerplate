import {React, Component} from "component";
import connect from "connect";
import {Select, Button} from "rebass";
import {selectedCharacterId, characters} from "store/actions";
import style from "./style.css";

@connect("characters", {
  onSelectCharacter: characters.select,
  onCreateCharacter: characters.create
})
export default class CharacterSelectForm extends Component {
  handleChangeCharacter = (event) => {
      this.props.onSelectCharacter(event.target.value);
  };
  handleCreateCharacter = () => {
    this.setState({dropdownOpen: false});
    this.props.onCreateCharacter();
  };
  render() {
    const {characters, onCreateCharacter} = this.props;

    return (
      <div className={style.root}>
        <Select
          label="Select Character"
          name="characterSelect"
          placeholder="No characters"
          value={characters.selected}
          onChange={this.handleChangeCharacter}
          options={characters.list.map(({fields, id}) => ({
            children: fields.name,
            value: id
          }))}
        />
        <Button onClick={onCreateCharacter}>Create</Button>
      </div>
    );
  }
}
