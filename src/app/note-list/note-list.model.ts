import { NoteDto } from '../shared/note.dto';

export class NoteListModel {
	id!: number;
	title!: string;

	constructor(dto: NoteDto) {
		this.id = dto.id;
		this.title = dto.title;
	}
}
