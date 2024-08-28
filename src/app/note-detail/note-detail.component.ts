import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { NotificationService } from '../shared/notification.service';
import { Subscription, take } from 'rxjs';
import { NoteDetailModel } from './note-detail.model';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	templateUrl: './note-detail.component.html',
	styleUrls: ['./note-detail.component.scss'],
	imports: [RouterModule, FormsModule, ConfirmModalComponent],
	providers: [NoteDetailModel],
})
export class NoteDetailComponent implements OnInit, OnDestroy {
	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	private notificationSubscription!: Subscription;
	notificationMessage: string | null = null;

	model = inject(NoteDetailModel);
	router = inject(Router);
	notificationService = inject(NotificationService);
	activeRoute = inject(ActivatedRoute);

	ngOnInit(): void {
		const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
		this.model.loadNoteById(id);

		this.notificationSubscription = this.notificationService
			.getNotification()
			.subscribe((message) => {
				this.notificationMessage = message;
			});
	}

	ngOnDestroy(): void {
		if (this.notificationSubscription) {
			this.notificationSubscription.unsubscribe();
		}
	}

	deleteOneNote(): void {
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			this.model.deleteNote();
			this.notificationService.setNotification(
				'The note was successfully deleted'
			);
			this.router.navigateByUrl('');
		});

		this.confirmModal.title = 'Delete Note';
		this.confirmModal.message = 'Do you really want to delete this note?';
		this.confirmModal.openModal();
	}

	editNote(): void {
		if (this.model.isEditing) {
			const validationMessage = this.model.validateNote();
			if (validationMessage) {
				this.notificationService.setNotification(validationMessage);
				return;
			}

			this.model.isEditing = false;
			this.model.saveNote();
			this.notificationService.setNotification(
				'Note was successfully updated'
			);
			this.router.navigateByUrl('');
		} else {
			this.model.isEditing = true;
		}
	}
}
