import { NoteDto } from "../shared/note.dto";

export class NoteDetailModel extends NoteDto {
	constructor(dto?: NoteDto) {
		super();
		if (dto) {
			Object.assign(this, dto);
		}
	}
}
