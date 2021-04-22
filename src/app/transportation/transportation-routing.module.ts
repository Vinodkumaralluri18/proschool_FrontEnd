import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsComponent } from './stations/stations.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RoutesComponent } from './routes/routes.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddrouteComponent } from './addroute/addroute.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path:'',redirectTo:'stations',pathMatch:'full'},
  {path:"stations",component:StationsComponent},
  {path:"vehicles",component:VehiclesComponent},
  {path:"routes",component:RoutesComponent},
  {path:"addvehicle",component:AddvehicleComponent},
  {path:"navigation",component:NavigationComponent},
  {path:"addroute",component:AddrouteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportationRoutingModule { }
