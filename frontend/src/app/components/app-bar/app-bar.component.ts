import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogLogoutComponent } from '../dialogs/dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {

  userLocal: any
  showFiller:boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ){
    this.userLocal = JSON.parse(localStorage.getItem('infoUser') || '{}');
  }

  menuNavRoot(root: string){
    this.router.navigate(['/'+root]);
  }

  openLogout(): void{
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: '450px',
      data: {title: "CERRAR SESIÓN", text: "¿Está seguro de cerrar la sesión de usuario actual?"},
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        window.localStorage.removeItem('infoUser');
        this.router.navigate(['/login']);
      }
    })
  }
}
