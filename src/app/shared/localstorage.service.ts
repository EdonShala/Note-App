import { Injectable } from '@angular/core';
import { NoteDto } from './note.dto';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	setLocalStorage(notes: NoteDto[]): void {
		localStorage.setItem('notes', JSON.stringify(notes));
	}

	getLocalStorage(): NoteDto[] {
		const localStorageStoredNote = localStorage.getItem('notes');
		let result: NoteDto[] = [];
		if (localStorageStoredNote) {
			result = JSON.parse(localStorageStoredNote);
		}
		return result;
	}

	clearLocalStorage(): void {
		localStorage.clear();
	}
}
