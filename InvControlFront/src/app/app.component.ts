import { Component, HostListener } from '@angular/core';
import { AuthserviceService } from './dashboard/services/authservice/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthserviceService) {}

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  handleUserActivity() {
    if (this.authService.isLoggedIn()) {
      this.authService.resetInactivityTimer();
    }
  }
  title = 'InvControl';

}
