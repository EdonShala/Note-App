export interface Note {
  id: number;
  title: string;
  text: string;
}
export const NOTES: Note[] = [
  {
    id: 1,
    title: 'A Title',
    text: 'Just a long text that will be dispalyed from the first Note that I have set as a value only for the testing. Later on, there will be proper data.',
  },
  {
    id: 2,
    title: 'The Second',
    text: 'Here is another, yet shorter Note text, that you can read throught. Enjoy (:.',
  },
];
