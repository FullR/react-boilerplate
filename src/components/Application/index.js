import {React, Component} from "component";
import connect from "connect";
import CharacterSelectForm from "components/CharacterSelectForm";
import CharacterForm from "components/CharacterForm";
import style from "./style.css";

@connect("characters")
export default class Application extends Component {
  render() {
    const {characters} = this.props;
    const {selected} = characters;
    return (
      <div className={style.root}>
        <CharacterSelectForm/>
        {selected &&
          <CharacterForm characterId={selected}/>
        }
      </div>
    );
  }
}
