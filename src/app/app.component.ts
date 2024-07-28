import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NotesListComponent } from './note-list/notes-list.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddNoteComponent } from './add-note/add-note.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NotesListComponent,
    ReactiveFormsModule,
    AddNoteComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'NoteApp';
  name = new FormControl('');
}
