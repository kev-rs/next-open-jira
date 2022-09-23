

export const getId = async (url: string) => {
  const res = await fetch(`http://localhost:3000${url}`);
  const data = res.json();
  return data;
};
