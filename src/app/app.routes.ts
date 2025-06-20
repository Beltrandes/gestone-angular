import { CustomerComponent } from './pages/customer/customer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { MaterialComponent } from './pages/material/material.component';
import { OrderComponent } from './pages/order/order.component';
import { FinanceComponent } from './pages/finance/finance.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':marbleshopId/painel', component: DashboardComponent },
  { path: ':marbleshopId/clientes', component: CustomerComponent },
  { path: ':marbleshopId/orcamentos', component: QuotationComponent },
  {path: ':marbleshopId/pedidos', component: OrderComponent},
  {path: ':marbleshopId/financas', component: FinanceComponent},
  {path: 'materiais', component: MaterialComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
