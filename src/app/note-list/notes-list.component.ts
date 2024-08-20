import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LocalStorage } from '../localstorage.component';
import { NotificationService } from '../notificationService.service';
import { Subscription } from 'rxjs';
import { Note } from '../../notes';

@Component({
	selector: 'app-notes-list',
	standalone: true,
	templateUrl: './notes-list.component.html',
	styleUrl: './notes-list.component.scss',
	imports: [RouterOutlet, RouterModule],
})
export class NotesListComponent implements OnInit, OnDestroy {
	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;
	notes: Note[] = [];
	localStorage = new LocalStorage();

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
		const confirmation: boolean = confirm(
			'Do you really want to delete ALL notes?'
		);

		if (confirmation) {
			this.notes = [];
			this.localStorage.setLocalStorage(this.notes);
			this.notificationService.setNotification(
				'All notes were successfully deleted'
			);
		}
	}

	ngOnDestroy() {
		if (this.notificationSubscription) {
			this.notificationSubscription.unsubscribe();
		}
	}
}
