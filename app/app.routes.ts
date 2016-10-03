import { provideRouter, RouterConfig } from '@angular/router';
import { TemplateIndexComponent} from './template-index.component';
import { TemplateCreateComponent } from './create-template.component';
import { TemplateEditComponent } from './edit-template.component';
import { TemplateInstanceIndexComponent} from './template-instance-index.component';
import { TemplateInstanceEditComponent} from './edit-template-instance.component';
import { ImageIndexComponent} from './image-index.component';
import { TemplateInstanceCreateComponent} from './create-template-instance.component';


export const routes: RouterConfig = [
    { path: 'templates/new', component: TemplateEditComponent },
    { path: 'templates', component: TemplateIndexComponent },
    { path: 'templates/:id/edit', component: TemplateEditComponent },
    { path: 'templates/:id/instance', component: TemplateInstanceCreateComponent }, 
    { path: 'template-instances', component: TemplateInstanceIndexComponent },
    { path: 'template-instances/:id', component: TemplateInstanceEditComponent },
    { path: 'images', component: ImageIndexComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];