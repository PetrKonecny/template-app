import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Image } from './image';

@Component({
    selector: 'image-list',
    template: `
            <div class="shutter">
                <h3 *ngIf="images && images.length == 0" class="nothing-found">Žádné obrázky k zobrazení</h3>
            </div>
            <div class="list-wrapper">
                <md-grid-list cols="3">
                    <md-grid-tile *ngFor="let image of images" (click)="onSelect(image)">
                        <image (click)="onSelect(image)" [image]="image" [thumb]="true"></image>            
                    </md-grid-tile>
                </md-grid-list>
            </div> `,
    styles: [`        
            .image {
                margin: 5px;
                border: 1px solid #ccc;
                float: left;
            }
            .image:hover {
                border: 1px solid #777;
            }
            .container {
                z-index: 3;
                background-color: grey;
                border: 1px solid black;
                display: flex;
                flex-wrap: wrap;
                width: 90%;
            }           
            `]
})

//displays grid of images 
export class ImageListComponent {
     
    @Input()
    //images to be displayed
    images : Image[] 
    //triggered when image is clicked
    @Output() onImageClicked = new EventEmitter<Image>();
    
    //triggered when image is clicked    
    onSelect(image: Image) {
        this.onImageClicked.emit(image);
    }
}