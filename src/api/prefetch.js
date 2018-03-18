const token = (o) => {
  const { getState, options } = o;
  const state = getState();
  const { sign_up, sign_in } = state.api;
  const t =
    (sign_in.data && sign_in.data.data) || (sign_up.data && sign_up.data.data)
      ? sign_in.data.data.token || sign_up.data.data.token
      : 'no---token';
  options.headers.Authorization = `Bearer ${t}`;
};
export default token;
