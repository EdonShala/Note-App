import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
	selector: 'app-confirm-modal',
	standalone: true,
	templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
	@Input() title: string = 'Confirm';
	@Input() message: string = 'Are you sure?';

	@Output() onConfirm: EventEmitter<void> = new EventEmitter();
	@Output() onClose: EventEmitter<void> = new EventEmitter();

	openModal(): void {
		const modalElement: HTMLElement | null = document.getElementById('confirmModal');
		if (modalElement) {
			const bootstrapModal: Modal = new Modal(modalElement);
			bootstrapModal.show();
		} else {
			// eslint-disable-next-line no-console
			console.error('Modal element not found.');
		}
	}

	closeModal(): void {
		const modalElement: HTMLElement | null = document.getElementById('confirmModal');
		if (modalElement) {
			const bootstrapModal: Modal | null = Modal.getInstance(modalElement);
			if (bootstrapModal) {
				bootstrapModal.hide();
			}
		}
		this.onClose.emit();
	}

	confirm(): void {
		this.onConfirm.emit();
		this.closeModal();
	}
}
