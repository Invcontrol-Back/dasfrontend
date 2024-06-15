import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice/authservice.service';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent {
  user: any = {};
  
  constructor(private authService: AuthserviceService) {
    this.getUserName();
    this.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): any {
    const user = this.authService.getUser();
    console.log("2 "+ user);
    return this.user = user;
  }
}
