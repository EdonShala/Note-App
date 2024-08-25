import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { NotificationService } from '../notificationService.service';
import { LocalStorage } from '../localstorage.component';
import { Note } from '../../notes';
import { take } from 'rxjs';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	templateUrl: './note-detail.component.html',
	styleUrls: ['./note-detail.component.scss'],
	imports: [RouterModule, FormsModule, ConfirmModalComponent],
})
export class NoteDetailComponent {
	constructor(
		private router: Router,
		private notificationService: NotificationService
	) {}

	activeRoute = inject(ActivatedRoute);
	localStorage = new LocalStorage();
	id: number = Number(this.activeRoute.snapshot.paramMap.get('id'));
	notes: Note[] = this.localStorage.getLocalStorage();
	note: Note = this.notes.find((i) => i.id === this.id) as Note;
	isEditing: boolean = false;
	notificationMessage: string | null = null;

	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	notificationSubscription = this.notificationService
		.getNotification()
		.subscribe((message) => {
			this.notificationMessage = message;
		});

	deleteOneNote() {
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			if (this.note) {
				const delNoteIndex = this.notes.indexOf(this.note);
				if (delNoteIndex > -1) {
					this.notes.splice(delNoteIndex, 1);
					this.localStorage.setLocalStorage(this.notes);
					this.notificationService.setNotification(
						'The note was successfully deleted'
					);
					this.router.navigateByUrl('');
				}
			}
		});

		this.confirmModal.title = 'Delete Note';
		this.confirmModal.message = 'Do you really want to delete this note?';

		this.confirmModal.openModal();
	}

	editNote() {
		if (this.isEditing) {
			if (!this.note.title.trim()) {
				return this.notificationService.setNotification(
					'The title cannot be empty!'
				);
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
	ngOnDestroy(): void {
		this.notificationSubscription.unsubscribe();
	}
}
