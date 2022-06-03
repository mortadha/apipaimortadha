import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, NotificationType, NotificationService, MediaService, AgentService } from '@app/core/services';
import { AccountDTO, MediaDTO } from '@neadz/dtos';
import { modalFactory } from '@app/shared/modal/modal.component';
import { CropImageModalComponent } from '@app/shared/modal/crop-image-modal/crop-image-modal.component';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.scss']
})
export class AgentProfileModalComponent implements OnInit, OnDestroy {

  private componentDestroyed = new Subject();
  agent: AccountDTO;
  originalAgent: AccountDTO;

  constructor(
    public userService: UserService,
    public notification: NotificationService,
    public dialog: MatDialog,
    public mediaService: MediaService,
    public agentService: AgentService
    ) {
  }

  ngOnInit() {
    this.agent = this.userService.getAccount();
    this.originalAgent = new AccountDTO();
    Object.assign(this.originalAgent, this.agent);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

    /**
   * Tell if user has a profile picture
   */
  hasProfilePicture(): boolean {
    return this.agent &&
      this.agent.profilePicture &&
      this.agent.profilePicture.url &&
      this.agent.profilePicture.url.length > 0;
  }

  cropImageModalAgent() {
    const modal = modalFactory<CropImageModalComponent>(this.dialog);
      modal.open({}, CropImageModalComponent, (result) => {
        if (result) {
          this.fileUploaded(result);
        }
      });
  }

  fileUploaded(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.mediaService.upload(formData).subscribe(
      data => {
        this.agent.profilePicture = new MediaDTO();
        this.agent.profilePicture.url = data['url'];
        this.agent.profilePicture.id = data['id'];

        this.agentService.updateAgent(this.agent)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(
            (result: AccountDTO) => {
              this.agent = result;
              this.userService.setAccount(result);
            }, (error) => {
              this.notification.show({
                title: 'Mise à jour',
                message: error,
                type: NotificationType.error
              });
            }
          );
      },
      error => console.error(error)
    );
  }

  close() {
    this.dialog.closeAll();
    this.userService.setAccount(this.originalAgent);
  }

  submit() {
    this.agentService.updateAgent(this.agent)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(
      (result: AccountDTO) => {
        this.agent = result;
        this.userService.setAccount(result);
        this.dialog.closeAll();
      }, (error) => {
        this.notification.show({
          title: 'Mise à jour',
          message: error,
          type: NotificationType.error
        });
      }
    );
  }

}
