import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { ShowVideosComponent } from "./Components/show-videos/show-videos.component";
import { ShowImagesComponent } from "./Components/show-images/show-images.component";
import { ShowInfoComponent } from "./Components/show-info/show-info.component";


import { AppComponent } from "src/app/app.component";
import {ShowHelpComponent} from "./Components/show-help/show-help.component";
import {ShowEstadisticsComponent} from "./Components/show-estadistics/show-estadistics.component";
import {DashBoardComponent} from "./Components/dash-board/dash-board.component";


const routes: Routes = [
  {
    path:'',
    redirectTo: '/diccionario',
    pathMatch: 'full',
  },{
    path: 'videos',
    component: ShowVideosComponent
  },
  {
    path: 'images',
    component: ShowImagesComponent
  },
  {
    path: 'info',
    component: ShowInfoComponent
  },
  {
    path: 'help',
    component: ShowHelpComponent
  },
  {
    path: 'estadistics',
    component: ShowEstadisticsComponent
  },
  {
    path: 'diccionario',
    component: DashBoardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
