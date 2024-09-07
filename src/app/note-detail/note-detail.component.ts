import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { NotificationService } from '../shared/notification.service';
import { NoteDetailModel } from './note-detail.model';
import { LocalStorageService } from '../shared/localstorage.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	templateUrl: './note-detail.component.html',
	styleUrls: ['./note-detail.component.scss'],
	imports: [RouterModule, FormsModule, ConfirmModalComponent, CommonModule],
})
export class NoteDetailComponent {
	constructor(
		private router: Router,
		private notificationService: NotificationService,
		private localStorage: LocalStorageService
	) {}

	activeRoute = inject(ActivatedRoute);
	id: number = Number(this.activeRoute.snapshot.paramMap.get('id'));
	notes: NoteDetailModel[] = this.localStorage.get();
	note: NoteDetailModel = this.notes.find(
		(i) => i.id === this.id
	) as NoteDetailModel;
	originalNote: NoteDetailModel = { ...this.note };
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
					this.localStorage.set(this.notes);
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
			this.originalNote = { ...this.note };
			this.localStorage.set(this.notes);
			this.notificationService.setNotification(
				'Note was successfully updated'
			);
			this.router.navigateByUrl('');
		} else {
			this.isEditing = true;
		}
	}

	cancelEdit() {
		this.isEditing = false;
		this.note = { ...this.originalNote };
	}

	ngOnDestroy(): void {
		this.notificationSubscription.unsubscribe();
	}
}
