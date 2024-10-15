import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { NotificationComponent } from '../shared/components/app-notification/app-notification.component';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { NoteDto } from '../shared/note.dto';
import { NoteService } from '../shared/services/note.service';
import { NotificationService } from '../shared/services/notification.service';
import { NoteDetailModel } from './note-detail.model';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	templateUrl: './note-detail.component.html',
	imports: [RouterModule, FormsModule, ConfirmModalComponent, CommonModule, NotificationComponent],
})
export class NoteDetailComponent implements OnDestroy, OnInit {
	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private noteService: NoteService,
		private notificationService: NotificationService
	) { }

	id!: string;
	note!: NoteDetailModel | undefined;
	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;

	@ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

	ngOnInit(): void {
		this.init();
	}

	ngOnDestroy(): void {
		this.notificationSubscription?.unsubscribe();
	}

	init(): void {
		const idParam: string | null = this.activeRoute.snapshot.paramMap.get('id');
		if (idParam && this.id !== '0') {
			this.id = idParam;
			const dto: NoteDto | undefined = this.noteService.get(this.id);
			this.note = new NoteDetailModel(dto);
		} else {
			// eslint-disable-next-line no-console
			console.error('No ID-Param found');
		}

		this.notificationSubscription = this.notificationService.getNotification().subscribe(message => {
			this.notificationMessage = message;
		});
	}

	deleteOneNote(): void {
		this.confirmModal.onConfirm.pipe(take(1)).subscribe(async () => {
			if (this.note) {
				this.noteService.delete(this.note.id);
				await this.router.navigateByUrl('');
			}
		});

		this.confirmModal.title = 'Delete Note';
		this.confirmModal.message = 'Do you really want to delete this note?';
		this.confirmModal.openModal();
	}

	async editNote(): Promise<void> {
		await this.router.navigateByUrl(`/edit/${this.id}`);
	}
}
