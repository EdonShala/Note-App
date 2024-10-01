import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormErrorComponent } from "../shared/form-error/form-error.component";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from "../shared/localstorage.service";
import { NoteAddModel } from "./add-note.model";
import { NoteService } from "../shared/note.service";

@Component({
	selector: "app-add-note",
	standalone: true,
	templateUrl: "./add-note.component.html",
	imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
})
export class AddNoteComponent implements OnInit {
	constructor(
		private localStorageService: LocalStorageService,
		private noteService: NoteService,
		private activeRoute: ActivatedRoute,
		private router: Router
	) {}

	id: number = Number(this.activeRoute.snapshot.paramMap.get("id"));
	note!: NoteAddModel;

	ngOnInit() {
		const note = this.noteService.getNoteById(this.id);
		if(this.id > 0) {
			this.note =
		} else {
			this.note = new NoteAddModel();
		}
		if (note) {
			this.note = new NoteAddModel(note);
		}
	}

	addNoteForm = new FormGroup({
		title: new FormControl("", Validators.required),
		description: new FormControl(""),
	});

	addNote() {
		const updatedNotes = this.localStorageService.get();

		let title = this.addNoteForm.value.title?.trim() ?? "";
		let description = this.addNoteForm.value.description?.trim() ?? "";

		if (this.addNoteForm.valid) {
			const ids = updatedNotes.map(note => note.id);
			const maxId = ids.length > 0 ? Math.max(...ids) : 0;

			const newNote: NoteAddModel = {
				id: maxId + 1,
				title: title,
				description: description,
			};

			updatedNotes.unshift(newNote);
			this.localStorageService.set(updatedNotes);

			this.addNoteForm.reset();
			this.router.navigateByUrl("/");
		}
	}

	cancelNote() {
		this.router.navigateByUrl("/");
	}
}
