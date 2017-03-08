import { React, Component } from 'component';
import { capitalize } from 'lodash';
import { Input, Select, Button, Label, Textarea } from 'rebass';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import Field from 'components/Field';
import races from 'dnd/races';
import alignments from 'dnd/alignments';
import genders from 'dnd/genders';
import getAbilityModifier from 'dnd/getAbilityModifier';
import { removeCharacter, updateCharacterField, createItem, removeItem } from 'store/actions/characters';
import style from './style.css';

@connect(
  ({characters}) => ({characters}),
  (dispatch) => ({
    onUpdateField: (id, key, value) => dispatch(updateCharacterField(id, key, value)),
    onRemoveCharacter: (id) => dispatch(removeCharacter(id)),
    onCreateItem: (id) => dispatch(createItem(id)),
    onRemoveItem: (id, itemId) => dispatch(removeItem(id, itemId)),
  })
)
export default class CharacterForm extends Component {
  state = {fieldQuery: ''};
  handleChangeString = (field) => (event) => this.props.onUpdateField(this.props.character.id, field, event.target.value);
  handleChangeInt = (field) => (event) => this.props.onUpdateField(this.props.character.id, field, parseInt(event.target.value));
  handleCreateItem = () => this.props.onCreateItem(this.props.character.id);
  handleRemoveCharacter = () => this.props.onRemoveCharacter(this.props.character.id);
  handleChangeFieldQuery = (event) => this.setState({fieldQuery: event.target.value});

  render() {
    const {character, onUpdateField, onCreateItem, onRemoveItem, onRemoveCharacter} = this.props;
    const {name, age, race, level, abilityScores, hp, items, alignment, backstory, gender} = character.fields;
    const {fieldQuery} = this.state;

    return (
      <div className={style.root}>
        <Input name="fieldQuery" label="Filter" type="text" value={fieldQuery} onChange={this.handleChangeFieldQuery}/>
        <div className={style.bio}>
          <Field query={fieldQuery} tags="name bio">
            <Input name="name" label="Name" type="text" value={name} onChange={this.handleChangeString("name")}/>
          </Field>
          <Field query={fieldQuery} tags="gender bio">
            <Select
              label="Gender"
              name="gender"
              value={gender}
              onChange={this.handleChangeString("gender")}
              options={genders.map((gender) => ({
                children: gender,
                value: gender
              }))}
            />
          </Field>
          <Field query={fieldQuery} tags="age bio">
            <Input name="age" label="Age" type="number" value={age} onChange={this.handleChangeInt("age")}/>
          </Field>
          <Field query={fieldQuery} tags="alignment bio">
            <Select
              label="Alignment"
              name="alignment"
              value={alignment}
              onChange={this.handleChangeString("alignment")}
              options={alignments.map((alignment) => ({
                children: alignment,
                value: alignment
              }))}
            />
          </Field>
          <Field query={fieldQuery} tags="race bio">
            <Select
              label="Race"
              name="race"
              value={race}
              onChange={this.handleChangeString("race")}
              options={races.map((race) => ({
                children: race,
                value: race
              }))}
            />
          </Field>
          <Field query={fieldQuery} tags="backstory bio">
            <Textarea
              rows={5}
              label="Backstory"
              name="backstory"
              value={backstory}
              onChange={this.handleChangeString("backstory")}
              placeholder="Your story"
            />
          </Field>
        </div>

        <Field query={fieldQuery} tags="level stats">
          <Input name="level" label="Level" type="number" value={level} onChange={this.handleChangeInt("level")}/>
        </Field>
        <div className={style.inputRow}>
          <Field query={fieldQuery} tags="hp health stats">
            <Input name="hp" label="HP" type="number" value={hp.current} onChange={this.handleChangeInt("hp.current")}/>
          </Field>
          <Field query={fieldQuery} tags="hp health stats max">
            <Input name="hpMax" label="Max" type="number" value={hp.max} onChange={this.handleChangeInt("hp.max")}/>
          </Field>
        </div>

        {abilityScores.map(({name, value}, index) => {
          const label = capitalize(name);
          return (
            <div className={style.abilityScore} key={name} className={style.inputRow}>
              <Field query={fieldQuery} tags={`${name} stats ability scores`}>
                <Input name={name} label={label} type="number" value={value} onChange={this.handleChangeInt(`abilityScores.${index}.value`)}/>
              </Field>
              <Field query={fieldQuery} tags={`${name} stats ability scores mod modifier`}>
                <Input name={`${name}-modified`} label="Modifier" type="number" value={getAbilityModifier(value)} disabled/>
              </Field>
            </div>
          )
        })}

        <Label>Items</Label>
        {items.map((item, index) => {
          const {id, name, weight, description} = item;
          return (
            <div className={style.item} key={id}>
              <Field className={style.inputRow} query={fieldQuery} tags={`item ${item.name}`}>
                <Input name={`item-${item.id}-name`} label="Name" type="text" value={name} onChange={this.handleChangeString(`items.${index}.name`)}/>
                <Input name={`item-${item.id}-weight`} label="Weight" type="number" value={weight} onChange={this.handleChangeString(`items.${index}.weight`)}/>
                <Input name={`item-${item.id}-description`} label="Description" type="text" value={description} onChange={this.handleChangeString(`items.${index}.description`)}/>
                <Button onClick={onRemoveItem.bind(null, character.id, item.id)}>Remove</Button>
              </Field>
            </div>
          )
        })}
        <div>
          <Button onClick={this.handleCreateItem}>Create</Button>
          <Button onClick={this.handleRemoveCharacter}>Delete</Button>
        </div>
      </div>
    );
  }
}
