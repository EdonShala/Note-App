import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule, ValidationErrors } from "@angular/forms";

@Component({
	selector: "app-form-error",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "form-error.component.html",
})
export class FormErrorComponent {
	@Input() fieldName!: string;
	@Input() errors!: ValidationErrors | null;
}
