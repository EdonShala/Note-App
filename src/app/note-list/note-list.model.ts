import { Injectable } from '@angular/core';
import { NoteDto } from '../shared/note.dto';

@Injectable()
export class NoteListModel {
	id!: number;
	title!: string;

	constructor(dto: NoteDto) {
		this.id = dto.id;
		this.title = dto.title;
	}
}
