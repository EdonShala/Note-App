import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/localstorage.service';
import { NoteDto } from '../shared/note.dto';

@Injectable()
export class NoteDetailModel {
	note: NoteDto | undefined;
	notes: NoteDto[] = [];
	isEditing: boolean = false;

	constructor(private localStorageService: LocalStorageService) {}

	loadNoteById(id: number): void {
		this.notes = this.localStorageService.getLocalStorage();
		this.note = this.notes.find((i) => i.id === id);
	}

	saveNote(): void {
		if (this.note) {
			const index = this.notes.findIndex((n) => n.id === this.note?.id);
			if (index !== -1) {
				this.notes[index] = this.note;
				this.localStorageService.setLocalStorage(this.notes);
			}
		}
	}

	deleteNote(): void {
		if (this.note) {
			this.notes = this.notes.filter((n) => n.id !== this.note?.id);
			this.localStorageService.setLocalStorage(this.notes);
		}
	}

	validateNote(): string | null {
		if (this.note && !this.note.title.trim()) {
			return 'The title cannot be empty!';
		}
		return null;
	}
}
