import { CustomerComponent } from './pages/customer/customer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QuotationComponent } from './pages/quotation/quotation.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':marbleshopId/painel', component: DashboardComponent },
  { path: ':marbleshopId/clientes', component: CustomerComponent },
  { path: ':marbleshopId/orcamentos', component: QuotationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
