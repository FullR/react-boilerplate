import { React, Component } from 'component';
import { last } from 'lodash';
import { compose } from 'ramda';
import CharacterSelectForm from 'components/CharacterSelectForm';
import CharacterForm from 'components/CharacterForm';
import { connect } from 'react-redux';
import { createCharacter, removeCharacter } from 'store/actions/characters';
import style from './style.css';

@connect(
  ({characters}) => ({characters}),
  (dispatch) => ({
    onCreateCharacter: compose(dispatch, createCharacter),
    onRemoveCharacter: compose(dispatch, removeCharacter),
  })
)
export default class Application extends Component {
  static defaultProps = {characters: []};

  constructor(props) {
    super(props);
    const selectedCharacter = props.characters[0];
    this.state = {
      selectedCharacterId: selectedCharacter && selectedCharacter.id
    };
  }

  componentWillReceiveProps(nextProps) {
    const {characters} = this.props;
    if(nextProps.characters.length > characters.length) {
      this.setState({
        selectedCharacterId: last(nextProps.characters).id
      });
    }
  }

  handleChangeSelectedCharacter = (characterId) => this.setState({selectedCharacterId: characterId});

  render() {
    const {selectedCharacterId} = this.state;
    const {characters, onCreateCharacter, onRemoveCharacter} = this.props;
    const selectedCharacter = selectedCharacterId && characters.find((character) => character.id === selectedCharacterId) || last(characters);

    return (
      <div className={style.root}>
        <CharacterSelectForm
          value={selectedCharacter && selectedCharacter.id || 'No characters'}
          characters={characters}
          onChange={this.handleChangeSelectedCharacter}
          onCreate={onCreateCharacter}
        />
        {selectedCharacter &&
          <CharacterForm character={selectedCharacter}/>
        }
      </div>
    );
  }
}
