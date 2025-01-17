import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'app-notification',
	standalone: true,
	templateUrl: './app-notification.component.html',
	styleUrl: './app-notification.component.scss',
})
export class NotificationComponent implements OnInit, OnDestroy {
	constructor(private notificationService: NotificationService) { }

	notificationMessage: string | null = null;
	private notificationSubscription: Subscription | undefined;

	ngOnInit(): void {
		this.notificationSubscription = this.notificationService.getNotification().subscribe(message => {
			this.notificationMessage = message;
		});
	}

	ngOnDestroy(): void {
		if (this.notificationSubscription) {
			this.notificationSubscription.unsubscribe();
		}
	}
}
