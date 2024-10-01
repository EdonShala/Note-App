import { NoteDto } from "../shared/note.dto";

export class NoteListModel {
	id!: string;
	title!: string;

	constructor(dto: NoteDto) {
		this.id = dto.id;
		this.title = dto.title;
	}
}
