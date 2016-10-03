import { Component, OnInit, Input, ViewChildren, QueryList} from '@angular/core';
import { Template} from './template';
import { Page} from './page';
import { NewPageComponent } from './new-page.component';
import { TemplateService } from './template.service';
import { ElementSelector } from './element-selector';
import { ElementSelectorComponent} from './element-selector.component';

@Component({
    selector: 'create-new-template',
    template: `
        <h2>Template creator</h2>
        <div>
            <label>name: </label>
            <input [(ngModel)]="template.name" placeholder="name"/>
        </div>
        <button (click)="createNewPage()">Add page</button>
        <button (click)="saveTemplate()">Save</button>\n\
        <element-select></element-select>
        <create-new-page *ngFor="let page of template.pages" [page]="page"></create-new-page>
    `,
    directives: [NewPageComponent, ElementSelectorComponent],
    providers: [TemplateService, ElementSelector]
})

export class NewTemplateComponent {

    @Input()
    template: Template;
    
    @ViewChildren(NewPageComponent)
    pagesComponents : QueryList<NewPageComponent>;
    
    constructor(
        private templateService: TemplateService 
    ){ }
    
    saveTemplate() {
        this.pagesComponents.toArray().forEach((child) => child.fillFromDOM());
        if (this.template.id > 0){
            this.templateService.updateTemplate(this.template).subscribe(template => this.template = template);
        }else{
            this.templateService.addTemplate(this.template).subscribe(template => this.template = template);
        }
    }
    
    createNewPage() {
        if (this.template.pages == null) {
            this.template.pages = new Array<Page>();
        }
        this.template.pages.push(new Page());
    }

}