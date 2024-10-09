import { Component, inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Subscription, take } from "rxjs";
import { NotificationComponent } from "../shared/components/app-notification/app-notification.component";
import { ConfirmModalComponent } from "../shared/components/confirm-modal/confirm-modal.component";
import { NoteService } from "../shared/note.service"; // Importiere den neuen NoteService
import { NoteListModel } from "./note-list.model";

@Component({
	selector: "app-note-list",
	standalone: true,
	templateUrl: "./note-list.component.html",
	imports: [RouterOutlet, RouterModule, ConfirmModalComponent, NotificationComponent],
})
export class NoteListComponent implements OnInit, OnDestroy {
	private noteService: NoteService = inject(NoteService);

	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;
	notes: NoteListModel[] = [];

	@ViewChild("confirmModal") confirmModal!: ConfirmModalComponent;

	ngOnInit() {
		const dtos = this.noteService.getAll();
		this.notes = dtos.map(dto => new NoteListModel(dto)).sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

		this.notificationSubscription = this.noteService.notificationService.getNotification().subscribe(message => {
			this.notificationMessage = message;
		});
	}

	ngOnDestroy() {
		this.notificationSubscription && this.notificationSubscription.unsubscribe();
	}

	deleteAll() {
		this.confirmModal.title = "Delete All Notes";
		this.confirmModal.message = "Do you really want to delete ALL notes?";
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			this.noteService.deleteAll();
			this.notes = [];
		});
		this.confirmModal.openModal();
	}
}
