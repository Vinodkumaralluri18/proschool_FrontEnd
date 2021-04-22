import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassWiseComponent } from './class-wise/class-wise.component';
import { EventsComponent } from './events/events.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';

const routes: Routes = [
  {path:'',redirectTo:'classwise',pathMatch:'full'},
  {path:"classwise",component:ClassWiseComponent},
  {path:"events",component:EventsComponent},
  {path:"noticeboard",component:NoticeboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
