import { Component, OnInit} from '@angular/core';
import { ImageService } from './image.service';
import { Image} from './image';
import { FileUploader } from 'ng2-file-upload';
import { AppConfig } from '../app.config'

//DEPRACATED
@Component({
    selector: 'image-upload',
    template: `
          <div style="position: absolute; background-color: white; width: 55%; margin-top: -24px; padding-top: 24px; z-index: 1000;">
          <label class="fileContainer">
            <b>SELECT FILES ({{uploader.queue.length}})</b>
            <input type="file" ng2FileSelect [uploader]="uploader" multiple  />
          </label>
          <md-progress-bar mode="determinate" [value]="uploader.progress"></md-progress-bar>
          <button md-raised-button (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">UPLOAD ALL</button>
          <button md-raised-button (click)="uploader.cancelAll()" [disabled]="!uploader.isUploading">CANCEL ALL</button>
          <button md-raised-button (click)="uploader.clearQueue()" [disabled]="!uploader.queue.length">REMOVE ALL</button>
          </div>
          <md-nav-list style="padding-top: 100px;">
              <div>          
              <md-list-item *ngFor="let item of uploader.queue">
                  <span md-line>{{ item?.file?.name }}</span>
                  <span md-line>
                  <md-progress-bar mode="determinate" [value]="item.progress"></md-progress-bar>
                  </span>
                  <button md-button (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">UPLOAD</button>
                  <button md-button (click)="item.cancel()" [disabled]="!item.isUploading">CANCEL</button>
                  <button md-button (click)="item.remove()">REMOVE</button>
              </md-list-item>
              </div>
          </md-nav-list>
    `,
    providers: [ImageService],
    styles: [`
      .fileContainer {
          overflow: hidden;
          position: relative;
      }

      .fileContainer {
          background-color: #ffd740;
          font-size: 14px;
          font-family: Roboto,"Helvetica Neue",sans-serif;
          float: left;
          margin: .5em;
          padding: .5em;
      }

      .fileContainer [type=file] {
          cursor: inherit;
          display: block;
          font-size: 999px;
          filter: alpha(opacity=0);
          min-height: 100%;
          min-width: 100%;
          opacity: 0;
          position: absolute;
          right: 0;
          text-align: right;
          top: 0;
      }

      .fileContainer [type=file] {
          cursor: pointer;
      }

    `]
})

export class ImageUploadComponent {

      
    public uploader:FileUploader = new FileUploader({url: this.config.getConfig('api-url')+'/image'});

    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    constructor(private config: AppConfig){}
 
    public fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
 
    public fileOverAnother(e:any):void {
      this.hasAnotherDropZoneOver = e;
    }

}