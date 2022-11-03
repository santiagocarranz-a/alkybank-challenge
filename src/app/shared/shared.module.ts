import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    AlertsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
