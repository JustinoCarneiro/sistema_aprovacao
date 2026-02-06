import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PoPageLoginModule // Importante: Habilita o template de login do PO UI
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private loginService: LoginService, // Nosso garçom/mock
    private router: Router,             // Para mudar de página
    private poNotification: PoNotificationService // Para avisos na tela
  ) {}

  // Este método é chamado automaticamente pelo template do PO UI
  loginSubmit(formData: any) {
    // Chamamos o método login do serviço passando os dados do formulário
    this.loginService.login(formData.login, formData.password).subscribe({
      next: (user) => {
        // Se der certo (next):
        this.poNotification.success(`Bem-vindo, ${user.name}!`);
        this.router.navigate(['/aproval']); // Navega para a tela de aprovações
      },
      error: (err) => {
        // Se der errado (error):
        this.poNotification.error(err.message);
      }
    });
  }
}