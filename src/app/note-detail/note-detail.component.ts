import { Component, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";
import { CommonModule } from "@angular/common";
import { take, Subscription } from "rxjs";
import { NotificationComponent } from "../shared/app-notification/app-notification.component";
import { NoteDetailModel } from "./note-detail.model";
import { NoteService } from "../shared/note.service";
import { NotificationService } from "../shared/notification.service";

@Component({
	selector: "app-note-detail",
	standalone: true,
	templateUrl: "./note-detail.component.html",
	imports: [RouterModule, FormsModule, ConfirmModalComponent, CommonModule, NotificationComponent],
})
export class NoteDetailComponent implements OnDestroy {
	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private noteService: NoteService,
		private notificationService: NotificationService
	) {}

	id: number = Number(this.activeRoute.snapshot.paramMap.get("id"));
	note: NoteDetailModel | undefined;
	noteEdit: NoteDetailModel | undefined;
	isEditing: boolean = false;
	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;

	@ViewChild("confirmModal") confirmModal!: ConfirmModalComponent;

	ngOnInit() {
		const note = this.noteService.getNoteById(this.id);
		if (note) {
			this.note = new NoteDetailModel(note);
		}

		this.notificationSubscription = this.notificationService.getNotification().subscribe(message => {
			this.notificationMessage = message;
		});
	}

	deleteOneNote() {
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			if (this.note) {
				this.noteService.deleteNoteById(this.note.id);
				this.router.navigateByUrl("");
			}
		});

		this.confirmModal.title = "Delete Note";
		this.confirmModal.message = "Do you really want to delete this note?";
		this.confirmModal.openModal();
	}

	editNote() {
		if (this.note) {
			if (this.isEditing && this.noteEdit) {
				this.isEditing = false;
				this.noteService.saveNote(this.noteEdit);
				this.noteService.notificationService.setNotification("Note was successfully updated");
				this.router.navigateByUrl("");
			} else {
				this.isEditing = true;
				this.noteEdit = new NoteDetailModel();
				this.noteEdit.id = this.note.id;
				this.noteEdit.title = this.note.title;
				this.noteEdit.description = this.note.description;
			}
		}
	}

	cancelEdit() {
		this.isEditing = false;
		this.noteEdit = undefined;
	}

	ngOnDestroy(): void {
		this.notificationSubscription?.unsubscribe();
	}
}
