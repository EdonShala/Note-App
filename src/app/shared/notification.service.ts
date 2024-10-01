import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	private messageSubject = new BehaviorSubject<string | null>(null);

	setNotification(message: string) {
		this.messageSubject.next(message);

		setTimeout(() => {
			this.clearNotification();
		}, 3000);
	}

	getNotification() {
		return this.messageSubject.asObservable();
	}

	clearNotification() {
		this.messageSubject.next(null);
	}
}
