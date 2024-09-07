import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../shared/localstorage.service';
import { NotificationService } from '../shared/notification.service';
import { Subscription, take } from 'rxjs';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { NoteListModel } from './note-list.model';

@Component({
	selector: 'app-notes-list',
	standalone: true,
	templateUrl: './notes-list.component.html',
	styleUrls: ['./notes-list.component.scss'],
	imports: [RouterOutlet, RouterModule, ConfirmModalComponent],
})
export class NotesListComponent implements OnInit, OnDestroy {
	constructor(
		private localStorageService: LocalStorageService,
		private notificationService: NotificationService
	) {}

	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;
	notes: NoteListModel[] = [];

	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	ngOnInit() {
		this.notes = this.localStorageService.get() || [];
		this.notificationSubscription = this.notificationService
			.getNotification()
			.subscribe((message) => {
				this.notificationMessage = message;
			});
	}

	ngOnDestroy() {
		if (this.notificationSubscription) {
			this.notificationSubscription.unsubscribe();
		}
	}

	deleteAll() {
		this.confirmModal.title = 'Delete All Notes';
		this.confirmModal.message = 'Do you really want to delete ALL notes?';

		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			this.notes = [];
			this.localStorageService.set(this.notes);
			this.notificationService.setNotification(
				'All notes were successfully deleted'
			);
		});

		this.confirmModal.openModal();
	}
}
