import { Injectable } from "@angular/core";
import { NoteDto } from "../note.dto";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
	set(notes: NoteDto[]): void {
		localStorage.setItem("notes", JSON.stringify(notes));
	}

	get(): NoteDto[] {
		const localStorageStoredNote = localStorage.getItem("notes");
		let result: NoteDto[] = [];
		if (localStorageStoredNote) {
			result = JSON.parse(localStorageStoredNote);
		}
		return result;
	}

	clear(): void {
		localStorage.clear();
	}
}
