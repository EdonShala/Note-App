import { Component } from '@angular/core';
import { Notes } from '../../notes';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  notes = Notes;

  show(title: string) {
    alert(title);
  }
}
