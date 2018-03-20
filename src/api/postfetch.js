import { setTasks, updateTask, addNewTask as addNew } from '../store/Knb';

const _c = ['TODO', 'IN_PROGRESS', 'DONE'];

export const tasks = ({ data: { data }, dispatch }) => {
  console.log(data);
  if (data) {
    const out = {};
    data.forEach((d) => {
      if (out[d.status]) {
        out[d.status].push(d);
      } else {
        out[d.status] = [d];
      }
    });
    _c.forEach((c) => {
      if (!out[c]) out[c] = [];
    });
    dispatch(setTasks(out));
  }
};

export const taskUpdated = ({ data: { data = {} }, dispatch }) => {
  dispatch(updateTask(data));
};

export const addNewTask = ({ data: { data = {} }, dispatch }) => {
  dispatch(addNew(data));
};

export default {};
