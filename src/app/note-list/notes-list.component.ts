import { Component, OnDestroy, OnInit } from '@angular/core';
import { Notes } from '../../notes';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LocalStorage } from '../localstorage.component';
import { NotificationService } from '../notificationService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  imports: [RouterOutlet, RouterModule],
})
export class NotesListComponent implements OnInit, OnDestroy {
  notificationMessage: string | null = null;
  private notificationSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) {}
  notes = Notes;
  localStorage = new LocalStorage();

  ngOnInit() {
    this.notificationSubscription = this.notificationService
      .getNotification()
      .subscribe((message) => {
        this.notificationMessage = message;
      });
  }

  show(title: string) {
    alert(title);
  }

  deleteAll() {
    const confirmation: boolean = confirm(
      'Do you really want to delete ALL notes?'
    );

    if (confirmation) {
      this.notes = [];
      this.notificationService.setNotification(
        'All notes were successfully deleted'
      );
    }
  }

  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
