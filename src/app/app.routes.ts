import { Routes } from '@angular/router';
import { NotesListComponent } from './note-list/notes-list.component';
import { AddNoteComponent } from './add-note/add-note.component';

export const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'new', component: AddNoteComponent },
];
