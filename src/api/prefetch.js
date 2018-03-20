const token = (o) => {
  const { getState, options } = o;
  const state = getState();
  /* eslint-disable  */
  const { sign_up, sign_in } = state.api;
  let t = 'no---token---';
  if (sign_in.data && sign_in.data.data) t = sign_in.data.data.token;
  else if (sign_up.data && sign_up.data.data) t = sign_up.data.data.token;
  options.headers.Authorization = `Bearer ${t}`;
};
export default token;
