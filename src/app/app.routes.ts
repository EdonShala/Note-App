import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './note-list/notes-list.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'new', component: AddNoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
