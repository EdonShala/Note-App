import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { CommonModule } from '@angular/common';
import { take, Subscription } from 'rxjs';
import { NotificationComponent } from '../shared/app-notification/app-notification.component';
import { NoteDetailModel } from './note-detail.model';
import { NoteService } from '../shared/note.service';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	templateUrl: './note-detail.component.html',
	imports: [RouterModule, FormsModule, ConfirmModalComponent, CommonModule, NotificationComponent],
})
export class NoteDetailComponent implements OnDestroy {
	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private noteService: NoteService,
		private notificationSubscription: Subscription
	) {}

	id: number = Number(this.activeRoute.snapshot.paramMap.get('id'));
	note: NoteDetailModel | undefined;
	isEditing: boolean = false;
	notificationMessage: string | null = null;

	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	ngOnInit() {
		const note = this.noteService.getNoteById(this.id);
		if (note) {
			this.note = new NoteDetailModel(note);
		}

		this.notificationSubscription = this.noteService.notificationService.getNotification().subscribe((message) => {
			this.notificationMessage = message;
		});
	}

	deleteOneNote() {
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			if (this.note) {
				this.noteService.deleteNoteById(this.note.id);
				this.router.navigateByUrl('');
			}
		});

		this.confirmModal.title = 'Delete Note';
		this.confirmModal.message = 'Do you really want to delete this note?';
		this.confirmModal.openModal();
	}

	editNote() {
		if (this.isEditing) {
			if (!this.note?.title.trim()) {
				return this.noteService.notificationService.setNotification(
					'The title cannot be empty!'
				);
			}

			this.isEditing = false;
			this.noteService.saveNote(this.note);
			this.noteService.notificationService.setNotification(
				'Note was successfully updated'
			);
			this.router.navigateByUrl('');
		} else {
			this.isEditing = true;
		}
	}

	cancelEdit() {
		this.isEditing = false;
	}

	ngOnDestroy(): void {
		this.notificationSubscription.unsubscribe();
	}
}
