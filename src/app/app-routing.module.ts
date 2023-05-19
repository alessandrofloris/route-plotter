import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PlotComponent} from "./plot/plot.component";
import {MultiRoutesViewComponent} from "./multi-routes-view/multi-routes-view.component";
import {SingleRouteViewComponent} from "./single-route-view/single-route-view.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', redirectTo: '', pathMatch: 'full' },
  { path: 'plot', component: PlotComponent, children: [
      { path:"", component: MultiRoutesViewComponent },
      { path: ":id", component: SingleRouteViewComponent }
    ]},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
