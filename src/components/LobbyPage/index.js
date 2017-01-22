import {React, Component} from "component";
import style from "./style.css";

export default class LobbyPage extends Component {
  state = {name: "", roomId: ''};

  handleNameChange = (event) => this.setState({name: event.target.value});
  handleRoomIdChange = (event) => this.setState({roomId: event.target.value});
  handleCreateRoom = () => {
    console.log("creating room!");
  };

  render() {
    return (
      <div className={style.root}>
        {this.props.foo}
        <input onChange={this.handleRoomIdChange} placeholder="Room"/>
        <input onChange={this.handleNameChange} placeholder="Name"/>
        <hr/>
        <button onClick={this.handleCreateRoom}>Create Room</button>
      </div>
    );
  }
}
