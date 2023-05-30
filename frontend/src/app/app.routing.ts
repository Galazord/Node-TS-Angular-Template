import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';
import { HomeLayoutComponent } from './components/layouts/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { LogsAnalyzerComponent } from './components/logs-analyzer/logs-analyzer.component';

/* const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
      },
      {
        path: 'config',
        component: ConfigComponent
      },
    ]
  }
] */

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  /* {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }, */
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'login',
        component: HomeComponent
      },
      {
        path: 'account',
        component: MyProfileComponent
      },
      {
        path: 'dataupload',
        component: DataUploadComponent
      },
      {
        path: 'logs',
        component: LogsAnalyzerComponent
      },
      {
        path: 'config',
        component: ConfigComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}