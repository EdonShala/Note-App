import { NoteDto } from "../shared/note.dto";

export class NoteListModel {
	id!: string;
	title!: string;
	createdAt!: Date;

	constructor(dto: NoteDto) {
		this.id = dto.id;
		this.title = dto.title;
		this.createdAt = new Date(dto.createdAt);
	}
}
