import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet } from "@angular/router";
import { NoteEditComponent } from "./note-edit/note-edit.component";
import { NoteListComponent } from "./note-list/note-list.component";
import { HeaderComponent } from "./shared/header/header.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, NoteListComponent, ReactiveFormsModule, NoteEditComponent, RouterModule],
	templateUrl: "./app.component.html",
})
export class AppComponent {}
