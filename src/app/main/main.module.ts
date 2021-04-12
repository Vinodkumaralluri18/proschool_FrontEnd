import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }