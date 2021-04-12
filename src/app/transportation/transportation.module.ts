import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { TransportationRoutingModule } from './transportation-routing.module';
import { StationsComponent } from './stations/stations.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RoutesComponent } from './routes/routes.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddrouteComponent } from './addroute/addroute.component';
import { EditstationComponent } from './editstation/editstation.component';
import { EditvehicleComponent } from './editvehicle/editvehicle.component';
import { EditrouteComponent } from './editroute/editroute.component';

@NgModule({
  declarations: [StationsComponent, VehiclesComponent, RoutesComponent, AddvehicleComponent, NavigationComponent, AddrouteComponent, EditstationComponent, EditvehicleComponent, EditrouteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TransportationRoutingModule,
    MatDialogModule
  ],
  entryComponents: [EditstationComponent, EditvehicleComponent, EditrouteComponent]
})
export class TransportationModule { }
