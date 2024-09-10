import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/localstorage.service';
import { NotificationService } from '../shared/notification.service';
import { NoteDto } from './note.dto';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private localStorageService: LocalStorageService,
    public notificationService: NotificationService
  ) {}

  getAllNotes(): NoteDto[] {
    return this.localStorageService.get() || [];
  }

  getNoteById(id: number): NoteDto | undefined {
    const notes = this.getAllNotes();
    return notes.find(note => note.id === id);
  }

  saveNote(note: NoteDto): void {
    const notes = this.getAllNotes();
    const existingNoteIndex = notes.findIndex(existingNote => existingNote.id === note.id);

    if (existingNoteIndex > -1) {
      notes[existingNoteIndex] = note;
      this.notificationService.setNotification('Note successfully updated.');
    } else {
      notes.push(note);
      this.notificationService.setNotification('Note successfully added.');
    }

    this.localStorageService.set(notes);
  }

  deleteNoteById(id: number): void {
    const notes = this.getAllNotes().filter(note => note.id !== id);
    this.localStorageService.set(notes);
    this.notificationService.setNotification('Note successfully deleted.');
  }

  deleteAllNotes(): void {
    this.localStorageService.set([]);
    this.notificationService.setNotification('All notes were successfully deleted.');
  }
}
