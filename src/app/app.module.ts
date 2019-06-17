import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {TreeModule} from 'primeng/tree';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {RatingModule} from 'primeng/rating';
import { AppComponent } from './app.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FarmsComponent } from './farms/farms.component';
import { RouterModule , Routes} from '@angular/router';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: 'farms', component: FarmsComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FarmsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TableModule,
		CalendarModule,
		SliderModule,
		DropdownModule,
		TreeModule,
		TriStateCheckboxModule,
    RatingModule,
    DialogModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes,{useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
