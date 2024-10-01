import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoteDetailComponent } from "./note-detail/note-detail.component";
import { NoteEditComponent } from "./note-edit/note-edit.component";
import { NoteListComponent } from "./note-list/note-list.component";

export const routes: Routes = [
	{ path: "", component: NoteListComponent },
	{ path: "edit/:id", component: NoteEditComponent },
	{ path: "note/:id", component: NoteDetailComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
