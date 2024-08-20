import { Component, inject } from '@angular/core';
import {
	Router,
	RouterModule,
	ActivatedRoute,
	RouterOutlet,
} from '@angular/router';
import { Note, Notes } from '../../notes';
import { NotificationService } from '../notificationService.service';
import { FormsModule } from '@angular/forms';
import { LocalStorage } from '../localstorage.component';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	templateUrl: './note-detail.component.html',
	styleUrl: './note-detail.component.scss',
	imports: [RouterModule, RouterOutlet, FormsModule],
})
export class NoteDetailComponent {
	constructor(
		private router: Router,
		private notificationService: NotificationService
	) {}

	activeRoute: ActivatedRoute = inject(ActivatedRoute);
	localStorage = new LocalStorage();
	id: number = Number(this.activeRoute.snapshot.paramMap.get('id'));
	notes: Note[] = this.localStorage.getLocalStorage();
	note: Note = this.notes.find((i) => i.id === this.id) as Note;
	isEditing: boolean = false;

	deleteOneNote() {
		const confirmation: boolean = confirm(
			'Do you really want to delete this note?'
		);

		if (confirmation) {
			if (this.note) {
				let delNote: number = this.notes.indexOf(this.note, 0);
				if (delNote > -1) {
					this.notes.splice(delNote, 1);
					this.localStorage.setLocalStorage(this.notes);
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

	editNote() {
		if (this.isEditing) {
			if (!this.note.title.trim()) {
				this.notificationService.setNotification(
					'Title and description cannot be empty!'
				);
				return;
			}

			this.isEditing = false;
			this.localStorage.setLocalStorage(this.notes);
			this.notificationService.setNotification(
				'Note was successfully updated'
			);
			this.router.navigateByUrl('');
		} else {
			this.isEditing = true;
		}
	}
}
