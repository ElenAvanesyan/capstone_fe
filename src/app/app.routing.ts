import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import {CoursesComponent} from './courses';
import { ProfessorHomeComponent } from './professor_home';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'allCourses', component: CoursesComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'courseCapacity', component: ProfessorHomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
