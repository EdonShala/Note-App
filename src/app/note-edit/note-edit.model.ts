import { GuidHelper } from "../shared/helpers/guid.helper";
import { NoteDto } from "../shared/note.dto";

export class NoteEditModel extends NoteDto {
	constructor(dto?: NoteDto) {
		super();
		if (dto) {
			Object.assign(this, dto);
		} else {
			this.id = GuidHelper.generate();
		}
	}
}
