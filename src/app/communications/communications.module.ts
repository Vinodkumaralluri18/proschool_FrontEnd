import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';
import { DirectivesModule } from '../_directives/_directives.module';

import { CommunicationsRoutingModule } from './communications-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { EmployeeMessagesComponent } from './employee-messages/employee-messages.component';
import { AddMessagesComponent } from './add-messages/add-messages.component';

@NgModule({
  declarations: [MessagesComponent, EmployeeMessagesComponent, AddMessagesComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PipesModule,
    DirectivesModule,
    CommonModule,
    CommunicationsRoutingModule
  ],
  entryComponents: [AddMessagesComponent]
})
export class CommunicationsModule { }
