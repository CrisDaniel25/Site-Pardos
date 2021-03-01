import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRouting, {  useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
