
export const getIdByUrl = async (url: string) => {
  const res = await fetch(`http://localhost:3000${url}`, {
    method: "GET"
  })
  const data = await res.json();
  return data;
}