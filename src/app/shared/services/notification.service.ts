import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
	private messageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

	setNotification(message: string): void {
		this.messageSubject.next(message);

		setTimeout(() => {
			this.clearNotification();
		}, 3000);
	}

	getNotification(): Observable<string | null> {
		return this.messageSubject.asObservable();
	}

	clearNotification(): void {
		this.messageSubject.next(null);
	}
}
