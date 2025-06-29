import data from "../public/data/sports.json";

export function getSportsData(): Promise<typeof data> {
  //creating fake api call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500); // Simulate 500ms delay
  });
}
