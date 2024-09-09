import { NoteDto } from '../shared/note.dto';

export class NoteDetailModel extends NoteDto {
	constructor(dto: NoteDto) {
		super();
		Object.assign(this, dto);
	}
}
