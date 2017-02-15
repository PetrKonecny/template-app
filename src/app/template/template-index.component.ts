import { Component, OnInit} from '@angular/core';
import {TemplateListComponent} from './template-list.component';
import { TemplateService } from './template.service';
import { Template} from './template';
import { Observable }     from 'rxjs/Observable';
import { Router } from '@angular/router'

@Component({
    selector: 'template-index',
    template: `
        <form (ngSubmit)="onSearchKeyUp(search.value)">
            <md-input-container><input #search mdInput type="search"></md-input-container>
            <button md-button>SEARCH</button>
        </form>
        <template-list [templates] = "templates" (onDeleteClicked) = "onDeleteClicked($event)"></template-list>\n\
        <button md-fab [routerLink] = "['/templates/new']"><md-icon>add</md-icon></button>
    `,
    providers: []
})

export class TemplateIndexComponent implements OnInit  {
    
    errorMessage: string;
    templates : Template[];

    constructor(
        private templateService: TemplateService, private router: Router 
    ){ }
    
    
    ngOnInit(){
        this.getTemplates();
    }

    onSearchKeyUp(query: string){
        this.router.navigate(['/templates/search', {query:query}]);
    }
    
    onDeleteClicked(template: Template){
        this.templateService.removeTemplate(template.id).subscribe(res => this.deleteFromList(template));
    }
    
    deleteFromList(template: Template){
        var index = this.templates.indexOf(template);
        this.templates.splice(index,1);
    }
    
    getTemplates(){
        this.templateService.getTemplates().subscribe(
                               templates => this.templates = templates,
                               error =>  this.errorMessage = <any>error
        );
    }
     
}