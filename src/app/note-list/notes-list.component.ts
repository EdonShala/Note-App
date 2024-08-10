import { Component } from '@angular/core';
import { Notes } from '../../notes';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  imports: [RouterOutlet, RouterModule],
})
export class NotesListComponent {
  notes = Notes;

  show(title: string) {
    alert(title);
  }
}
