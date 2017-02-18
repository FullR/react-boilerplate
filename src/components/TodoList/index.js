import {React, Component} from "component";
import connect from "connect";
import style from "./style.css";
import {tasks} from "store/actions";

@connect("tasks", {
  onCreateTask: tasks.create,
  onRemoveTask: tasks.remove,
  onToggleTask: tasks.toggle
})
export default class TodoList extends Component {
  state = {taskText: ""};
  handleTaskTextChange = (event) => this.setState({taskText: event.target.value});
  handleCreateTask = () => this.props.onCreateTask(this.state.taskText);

  render() {
    const {tasks, onCreateTask, onRemoveTask, onToggleTask} = this.props;
    const {taskText} = this.state;

    return (
      <div className={style.root}>
        <ul>
          <input value={taskText} onChange={this.handleTaskTextChange}/>
          <button onClick={this.handleCreateTask}>Create</button>
          {tasks.map((task) =>
            <li
              key={task.id}
              onClick={onToggleTask.bind(null, task.id)}
              style={{textDecoration: task.complete ? "line-through" : null}}
            >
              {task.text}
              <button onClick={onRemoveTask.bind(null, task.id)}>Remove</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
