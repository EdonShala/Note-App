import { Injectable } from "@angular/core";
import { LocalStorageService } from "../shared/localstorage.service";
import { NotificationService } from "../shared/notification.service";
import { NoteDto } from "./note.dto";

@Injectable({ providedIn: "root" })
export class NoteService {
	constructor(
		private localStorageService: LocalStorageService,
		public notificationService: NotificationService
	) {}

	getAll(): NoteDto[] {
		return this.localStorageService.get() || [];
	}

	get(id: string): NoteDto | undefined {
		return this.getAll().find(n => n.id === id);
	}

	save(note: NoteDto): void {
		const notes = this.getAll();
		const existingNoteIndex = notes.findIndex(n => n.id === note.id);

		if (existingNoteIndex > -1) {
			notes[existingNoteIndex] = note;
			this.notificationService.setNotification("Note successfully updated.");
		} else {
			notes.push(note);
			this.notificationService.setNotification("Note successfully added.");
		}

		this.localStorageService.set(notes);
	}

	delete(id: string): void {
		const notes = this.getAll().filter(note => note.id !== id);
		this.localStorageService.set(notes);
		this.notificationService.setNotification("Note successfully deleted.");
	}

	deleteAll(): void {
		this.localStorageService.set([]);
		this.notificationService.setNotification("All notes were successfully deleted.");
	}
}
