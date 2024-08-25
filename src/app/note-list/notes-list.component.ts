import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LocalStorage } from '../localstorage.component';
import { NotificationService } from '../notificationService.service';
import { Subscription, take } from 'rxjs';
import { Note } from '../../notes';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
	selector: 'app-notes-list',
	standalone: true,
	templateUrl: './notes-list.component.html',
	styleUrls: ['./notes-list.component.scss'],
	imports: [RouterOutlet, RouterModule, ConfirmModalComponent],
})
export class NotesListComponent implements OnInit, OnDestroy {
	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;
	notes: Note[] = [];
	localStorage = new LocalStorage();

	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	constructor(private notificationService: NotificationService) {}

	ngOnInit() {
		this.notes = this.localStorage.getLocalStorage();
		this.notificationSubscription = this.notificationService
			.getNotification()
			.subscribe((message) => {
				this.notificationMessage = message;
			});
	}

	deleteAll() {
		this.confirmModal.title = 'Delete All Notes';
		this.confirmModal.message = 'Do you really want to delete ALL notes?';

		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			this.notes = [];
			this.localStorage.setLocalStorage(this.notes);
			this.notificationService.setNotification(
				'All notes were successfully deleted'
			);
		});

		this.confirmModal.openModal();
	}

	ngOnDestroy() {
		if (this.notificationSubscription) {
			this.notificationSubscription.unsubscribe();
		}
	}
}
