import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

/**
 * AuthGuard (Segurança de Rota)
 * Este é um Guard funcional (padrão atual do Angular Standalone)
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Injeção de dependência manual (necessário em Guards funcionais)
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Verificação de segurança
  if (loginService.isLoggedIn()) {
    // Se o serviço disser que o usuário está logado, permite o acesso
    return true;
  } else {
    // Se não estiver logado, redireciona para a tela de login
    router.navigate(['/login']);
    return false;
  }
};