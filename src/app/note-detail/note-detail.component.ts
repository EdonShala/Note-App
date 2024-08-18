import { Component, inject } from '@angular/core';
import {
  Router,
  RouterModule,
  ActivatedRoute,
  RouterOutlet,
} from '@angular/router';
import { Note, Notes } from '../../notes';
import { NotificationService } from '../notificationService.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
  imports: [RouterModule, RouterOutlet],
})
export class NoteDetailComponent {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  id: number = Number(this.activeRoute.snapshot.paramMap.get('id'));
  note: Note = Notes.find((i) => i.id === this.id) as Note;

  deleteOneNote() {
    const confirmation: boolean = confirm(
      'Do you really want to delete this note?'
    );

    if (confirmation) {
      if (this.note) {
        let delNote: number = Notes.indexOf(this.note, 0);
        if (delNote > -1) {
          Notes.splice(delNote, 1);

          this.notificationService.setNotification(
            'The note was successfully deleted'
          );

          this.router.navigateByUrl('');
        }
      }
    } else {
      this.router.navigateByUrl('/note');
    }
  }
}
