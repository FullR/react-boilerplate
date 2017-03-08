import { React, Component } from 'component';
import { Select, Button } from 'rebass';
import style from './style.css';

export default class CharacterSelectForm extends Component {
  handleChangeCharacter = (event) => {
      this.props.onChange(event.target.value);
  };

  handleCreateCharacter = () => {
    this.setState({dropdownOpen: false});
    this.props.onCreate();
  };

  render() {
    const {value, characters, onCreate} = this.props;

    return (
      <div className={style.root}>
        <Select
          label="Select Character"
          name="characterSelect"
          value={value || "No Characters"}
          onChange={this.handleChangeCharacter}
          options={characters.map(({fields, id}) => ({
            children: fields.name,
            value: id
          }))}
        />
        <Button onClick={onCreate}>Create</Button>
      </div>
    );
  }
}
