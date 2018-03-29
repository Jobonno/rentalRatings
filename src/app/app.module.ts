import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModulesModule } from './material-modules/material-modules.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RegisterValidator } from './customValidators/registerUser';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    HomeComponent,
    AboutComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModulesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, RegisterValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }
