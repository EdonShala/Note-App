import { NoteDto } from '../shared/note.dto';

export class NoteDetailModel {
	id!: string;
	title!: string;
	description?: string;

	constructor(dto?: NoteDto) {
		if (dto) {
			this.id = dto.id;
			this.title = dto.title;
			this.description = dto.description;
		}
	}
}
