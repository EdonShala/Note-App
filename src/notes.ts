import { LocalStorageService } from './app/shared/localstorage.service';

export interface Note {
	id: number;
	title: string;
	description: string;
}
const localStorage = new LocalStorageService();
export let Notes: Note[] = localStorage.getLocalStorage();
