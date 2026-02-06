import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoMenuModule, PoToolbarModule, PoPageModule } from '@po-ui/ng-components';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,  
    PoMenuModule, 
    PoToolbarModule, 
    PoPageModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // Verifica se já existe uma sessão para decidir se mostra o menu lateral
    this.isLoggedIn = this.loginService.isLoggedIn();

    // Ouve o serviço de login para reagir a mudanças (login/logout)
    this.loginService.mostrarMenuEmitter.subscribe(
      status => this.isLoggedIn = status
    );
  }
}