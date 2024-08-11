import { Component, inject } from '@angular/core';
import {
  Router,
  RouterModule,
  ActivatedRoute,
  RouterOutlet,
} from '@angular/router';
import { Notes } from '../../notes';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
  imports: [RouterModule, RouterOutlet],
})
export class NoteDetailComponent {
  router = inject(Router);

  activeRoute = inject(ActivatedRoute);
  id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  note = Notes.find((i) => i.id === this.id);
}
