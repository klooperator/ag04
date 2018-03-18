const _c = {
  TODO: 'TODO',
  PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  MOVE_TO_COLUMN: '>>move_to_column',
  SET_TASKS: '>>set_tasks',
};

const initialState = {
  /*
  [_c.TODO]: [
    {
      name: 'task one',
      description: 'description goes here',
      status: _c.TODO,
      assignee: 'f33a440f-c18f-4d62-a6d8-25411d937cfa',
      tags: [1],
      blockedBy: [],
    },
    {
      name: 'taask two',
      description: 'description goes here',
      status: _c.TODO,
      assignee: 'f33a440f-c18f-4d62-a6d8-25411d937cfa',
      tags: [1],
      blockedBy: [],
    },
  ],
  [_c.PROGRESS]: [
    {
      name: 'tazcsk e',
      description: 'description goes here',
      status: _c.PROGRESS,
      assignee: 'f33a440f-c18f-4d62-a6d8-25411d937cfa',
      tags: [1],
      blockedBy: [],
    },
    {
      name: 'taefsk e',
      description: 'description goes here',
      status: _c.PROGRESS,
      assignee: 'f33a440f-c18f-4d62-a6d8-25411d937cfa',
      tags: [1],
      blockedBy: [],
    },
  ],
  [_c.DONE]: [
    {
      name: 'taswk e',
      description: 'description goes here',
      status: _c.DONE,
      assignee: 'f33a440f-c18f-4d62-a6d8-25411d937cfa',
      tags: [1],
      blockedBy: [],
    },
    {
      name: 'taswqk e',
      description: 'description goes here',
      status: _c.DONE,
      assignee: 'f33a440f-c18f-4d62-a6d8-25411d937cfa',
      tags: [1],
      blockedBy: [],
    },
  ],
 */
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  const p = action.payload;
  switch (action.type) {
    case _c.MOVE_TO_COLUMN:
      newState[p.to] = newState[p.to].concat(newState[p.from].splice(p.index, 1));
      return newState;
    case _c.SET_TASKS:
      return action.payload;
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
