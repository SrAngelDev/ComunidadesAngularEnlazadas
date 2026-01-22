import { Routes } from '@angular/router';
import { ComunidadesComponent } from './components/comunidades.component';

export const routes: Routes = [
  { path: '', component: ComunidadesComponent },
  { path: '**', redirectTo: '' }
];
