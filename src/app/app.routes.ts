import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AprovalComponent } from './pages/aproval/aproval.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // 1. Rota de Login: A porta de entrada
  { path: 'login', component: LoginComponent },

  // 2. Rota de Aprovação: Protegida pelo segurança (Guard)
  { 
    path: 'aproval', 
    component: AprovalComponent, 
    canActivate: [authGuard] 
  },

  // 3. O Direcionamento Inicial: 
  // Quando o caminho for vazio (''), redirecione para 'login'
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 4. Rota de Fuga (Wildcard): 
  // Se o usuário digitar qualquer coisa errada, volta para o login
  { path: '**', redirectTo: '/login' }
];