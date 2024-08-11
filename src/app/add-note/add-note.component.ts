import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notes } from '../../notes';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../form-error/form-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  standalone: true,
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
})
export class AddNoteComponent {
  router = inject(Router);
  addNoteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
  addNote() {
    let title = this.addNoteForm.value.title ?? '';
    let description = this.addNoteForm.value.description ?? '';

    if (this.addNoteForm.valid) {
      let ids = Notes.map((a) => a.id);
      let maxId = 0;
      if (ids.length > 0) {
        maxId = Math.max(...ids);
      }
      let newNote = {
        id: maxId + 1,
        title: title,
        description: description,
      };
      Notes.unshift(newNote);
      this.addNoteForm.reset();

      this.router.navigateByUrl('/');
    }
  }

  cancelNote() {
    this.router.navigateByUrl('/');
  }
}
