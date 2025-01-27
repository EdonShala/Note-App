import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorComponent } from '../shared/components/form-error/form-error.component';
import { NoteDto } from '../shared/note.dto';
import { NoteService } from '../shared/services/note.service';
import { NoteEditModel } from './note-edit.model';

@Component({
	selector: 'app-note-edit',
	standalone: true,
	templateUrl: './note-edit.component.html',
	imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
})
export class NoteEditComponent implements OnInit {
	id!: string;
	note!: NoteEditModel;
	formGroup!: FormGroup;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private noteService: NoteService
	) { }

	ngOnInit(): void {
		this.init();
	}

	init(): void {
		const idParam: string | null = this.activeRoute.snapshot.paramMap.get('id');
		if (idParam) {
			this.id = idParam;
			if (this.id !== '0') {
				const dto: NoteDto | undefined = this.noteService.get(this.id);
				this.note = new NoteEditModel(dto);
			} else {
				this.note = new NoteEditModel();
			}

			this.formGroup = new FormGroup({
				title: new FormControl(this.note.title, [Validators.required]),
				description: new FormControl(this.note.description),
			});
		} else {
			// eslint-disable-next-line no-console
			console.error('No ID-Param found');
		}
	}

	async add(): Promise<void> {
		const { title, description } = this.formGroup.value;
		if (this.formGroup.valid) {
			this.note.title = title as string;
			this.note.description = description as string;
			this.noteService.save({
				id: this.note.id,
				title: this.note.title,
				description: this.note.description,
				createdAt: this.note.createdAt.toString(),
			});
			this.formGroup.reset();
			await this.router.navigateByUrl('/');
		}
	}

	async cancel(): Promise<void> {
		await this.router.navigateByUrl('/');
	}
}
