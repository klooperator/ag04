const _c = {
  TODO: 'TODO',
  PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  MOVE_TO_COLUMN: '>>move_to_column',
  SET_TASKS: '>>set_tasks',
  UPDATE_TASK: '>>update_task',
  ADD_NEW: '>>and_new_task',
};

const initialState = {};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  const p = action.payload;
  switch (action.type) {
    /* case _c.MOVE_TO_COLUMN:
      if (p.to === 'DONE') {
        let bool = false;
        if (newState[p.index].blockedBy.length > 0) {
          newState[p.index].blockedBy.forEach((e) => {
            state.TODO.concat(state.iN_PROGRESS).forEach((n) => {
              if (n.id === e) bool = true;
            });
          });
        }
        if (bool) return state;
      }
      newState[p.to] = newState[p.to].concat(newState[p.from].splice(p.index, 1));
      return newState; */
    case _c.SET_TASKS:
      return action.payload;
    case _c.UPDATE_TASK:
      if (p.id && !p.error) {
        Object.keys(newState).forEach((k) => {
          newState[k].forEach((e, i) => {
            if (e.id === p.id) {
              if (e.status === p.status) newState[k][i] = p;
              else {
                newState[k].splice(i, 1);
                newState[p.status].push(p);
              }
            }
          });
        });
      }
      return newState;
    case _c.ADD_NEW:
      newState[_c.TODO].push(p);
      return newState;
    default:
      return newState;
  }
};

export default reducer;

export const moveToColumn = payload => ({
  type: _c.MOVE_TO_COLUMN,
  payload,
});
export const setTasks = payload => ({
  type: _c.SET_TASKS,
  payload,
});
export const updateTask = payload => ({
  type: _c.UPDATE_TASK,
  payload,
});
export const addNewTask = payload => ({
  type: _c.ADD_NEW,
  payload,
});
