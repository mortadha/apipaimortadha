import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum NotificationType {
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning'
}

export interface Notification {
  title: string;
  message: string;
  type: NotificationType;
}

@Injectable()
export class NotificationService {
  constructor(private service: ToastrService) {
  }

  /**
   * Show notification toaster
   * @param notification Notification Message
   */
  public show(notification: Notification) {
      this.service[notification.type](notification.message, notification.title);
  }
}
