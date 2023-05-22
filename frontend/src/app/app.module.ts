import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { LoginComponent } from './components/login/login.component';
import { DialogErrorComponent } from './components/dialogs/dialog-error/dialog-error.component';
import { DialogLogoutComponent } from './components/dialogs/dialog-logout/dialog-logout.component';
import { DialogSuccessComponent } from './components/dialogs/dialog-success/dialog-success.component';
import { DialogLoaderComponent } from './components/dialogs/dialog-loader/dialog-loader.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfigComponent,
    LoginComponent,
    DialogErrorComponent,
    DialogLogoutComponent,
    DialogSuccessComponent,
    DialogLoaderComponent,
    AppBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http);
}