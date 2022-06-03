import { Component, OnInit, OnDestroy, NgModule, ViewChild, NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ngx-img-cropper';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { environment } from '@env/environment';

export interface CropImageModalData {
  name: string;
  // tslint:disable-next-line:no-any
  data1: any;
  cropperSettings1: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
}

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss']
})
export class CropImageModalComponent implements OnInit, OnDestroy {
  name: string;
  // tslint:disable-next-line:no-any
  data1: any;
  cropperSettings1: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  @ViewChild('input') image: ElementRef;
  private componentDestroyed = new Subject();
  constructor(public dialogRef: MatDialogRef<CropImageModalComponent>,
    private notification: NotificationService) {

    this.name = 'Angular2';
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 200;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 10;
    this.cropperSettings1.minHeight = 10;

    this.cropperSettings1.rounded = true;
    this.cropperSettings1.keepAspect = true;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.cropperSettings1.noFileInput = true;
    this.cropperSettings1.allowedFilesRegex = /.(jpe?g|png)$/i;

    this.data1 = {};
  }

  cropped(bounds: Bounds) {
    // tslint:disable-next-line:whitespace
    this.croppedHeight = bounds.bottom-bounds.top;
    // tslint:disable-next-line:whitespace
    this.croppedWidth = bounds.right-bounds.left;
  }

  fileChangeListener($event) {
    const image = new Image();
    const file: File = $event.target.files[0];

    const regexp = /([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpeg|.jpg)$/i;
    if (!regexp.test(this.image.nativeElement.value)) {
      this.image.nativeElement.value = '';
      this.notification.show({
        title: 'Fichier non Valide',
        message: 'Le fichier n\'est pas valide',
        type: NotificationType.error
      });
    }

    if (file.size > environment.fileMaxSize) {
      this.image.nativeElement.value = '';
      this.notification.show({
        title: 'Fichier trop gros',
        message: 'La taille de l\'image ne doit pas dépasser 5Mo',
        type: NotificationType.error
      });
    } else {
      const myReader: FileReader = new FileReader();
      // tslint:disable-next-line:no-any
      myReader.onloadend = (loadEvent: any) => {
          image.src = loadEvent.target.result;
          this.cropper.setImage(image);
      };
      myReader.readAsDataURL(file);
    }
  }

  urltoFile(url, filename, mimeType) {
    if (url && filename) {
      mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
      return (fetch(url)
      .then(function(res) {
        return res.arrayBuffer(); })
        .then(function(buf) {
          return new File([buf], filename, {type: mimeType}); })
      );
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  submit(dataUrl) {
    if (dataUrl) {
      this.urltoFile(dataUrl, 'file.png', null)
      .then((file) => {
        this.dialogRef.close(file);
      });
    }
  }
}
