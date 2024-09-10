import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NoteService } from '../shared/note.service'; // Importiere den neuen NoteService
import { Subscription, take } from 'rxjs';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { NoteListModel } from './note-list.model';
import { NotificationComponent } from '../shared/app-notification/app-notification.component';

@Component({
	selector: 'app-notes-list',
	standalone: true,
	templateUrl: './notes-list.component.html',
	imports: [RouterOutlet, RouterModule, ConfirmModalComponent, NotificationComponent],
})
export class NotesListComponent implements OnInit, OnDestroy {
	constructor(private noteService: NoteService) {}

	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;
	notes: NoteListModel[] = [];

	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	ngOnInit() {
		const dtos = this.noteService.getAllNotes();
		this.notes = dtos.map(dto => new NoteListModel(dto))

		this.notificationSubscription = this.noteService.notificationService.getNotification().subscribe((message) => {
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
			this.noteService.deleteAllNotes();
			this.notes = [];
		});

		this.confirmModal.openModal();
	}
}
