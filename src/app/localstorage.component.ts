import { Note } from '../notes';

export class LocalStorage {
  setLocalStorage(notes: Note[]) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  getLocalStorage() {
    const localStorageStoredNote = localStorage.getItem('notes');
    let result: Note[] = [];
    if (localStorageStoredNote) {
      result = JSON.parse(localStorageStoredNote);
    }
    return result;
  }
  clearLocalStorage() {
    localStorage.clear();
  }
}
