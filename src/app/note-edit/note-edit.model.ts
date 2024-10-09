import { GuidHelper } from "../shared/helpers/guid.helper";
import { NoteDto } from "../shared/note.dto";

export class NoteEditModel {
	id!: string;
	title!: string;
	description?: string;
	createdAt!: Date;

	constructor(dto?: NoteDto) {
		if (dto) {
			this.id = dto.id;
			this.title = dto.title;
			this.description = dto.description;
			this.createdAt = new Date(dto.createdAt);
		} else {
			this.id = GuidHelper.generate();
			this.createdAt = new Date();
		}
	}
}
