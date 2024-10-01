import { CommonModule } from "@angular/common";
import { Component, OnDestroy, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Subscription, take } from "rxjs";
import { NotificationComponent } from "../shared/app-notification/app-notification.component";
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";
import { NoteService } from "../shared/note.service";
import { NotificationService } from "../shared/notification.service";
import { NoteDetailModel } from "./note-detail.model";

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

	id!: string;
	note!: NoteDetailModel | undefined;
	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;

	@ViewChild("confirmModal") confirmModal!: ConfirmModalComponent;

	ngOnInit() {
		this.init();
	}

	ngOnDestroy(): void {
		this.notificationSubscription?.unsubscribe();
	}

	init() {
		const idParam = this.activeRoute.snapshot.paramMap.get("id");
		if (idParam && this.id !== "0") {
			this.id = idParam;
			const dto = this.noteService.get(this.id);
			this.note = new NoteDetailModel(dto);
		} else {
			console.error("No ID-Param found");
		}

		this.notificationSubscription = this.notificationService.getNotification().subscribe(message => {
			this.notificationMessage = message;
		});
	}

	deleteOneNote() {
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(() => {
			if (this.note) {
				this.noteService.delete(this.note.id);
				this.router.navigateByUrl("");
			}
		});

		this.confirmModal.title = "Delete Note";
		this.confirmModal.message = "Do you really want to delete this note?";
		this.confirmModal.openModal();
	}

	editNote() {
		this.router.navigateByUrl(`/edit/${this.id}`);
	}
}
