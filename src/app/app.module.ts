import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


//Angular Material Imports
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTreeModule} from "@angular/material/tree";


//Components
import {ShowVideosComponent} from './Components/show-videos/show-videos.component';
import {ShowImagesComponent} from './Components/show-images/show-images.component';
import {ShowInfoComponent} from './Components/show-info/show-info.component';
import {ShowHelpComponent} from './Components/show-help/show-help.component';
import {ShowEstadisticsComponent} from './Components/show-estadistics/show-estadistics.component';
import {AlphabethComponent} from './Components/alphabeth/alphabeth.component';
import {DuplicatePipe} from './Pipes/duplicate.pipe';
import {MainNavComponent} from './Components/main-nav/main-nav.component';
import {DashBoardComponent} from './Components/dash-board/dash-board.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DashBoardHeaderComponent} from './Components/dash-board/dash-board-header/dash-board-header.component';
import {DashBoardContentComponent} from './Components/dash-board/dash-board-content/dash-board-content.component';
import {DashBoardIfoComponent} from "./Components/dash-board/dash-board-ifo/dash-board-ifo.component";
import {ImageModalComponent} from "./Components/modals/image-modal/image-modal.component";
import {VideoModalComponent} from "./Components/modals/video-modal/video-modal.component";
import {VerbalTableModalComponent} from "./Components/modals/verbal-table-modal/verbal-table-modal.component";
import {AdvFilterPipe} from "./Pipes/adv-filter.pipe";



@NgModule({
  declarations: [
    AppComponent,
    ShowVideosComponent,
    ShowImagesComponent,
    ShowInfoComponent,
    ShowHelpComponent,
    ShowEstadisticsComponent,
    AlphabethComponent,
    DuplicatePipe,
    AdvFilterPipe,
    MainNavComponent,
    DashBoardComponent,
    DashBoardHeaderComponent,
    DashBoardContentComponent,
    DashBoardIfoComponent,
    VerbalTableModalComponent,
    VideoModalComponent,
    ImageModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
