export const isLoggedIn = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};

export const handleChange = (callback, data, name, value) => {
  const key = name;
  const keyValue = value;
  callback({
    ...data,
    [key]: keyValue,
  });
};
