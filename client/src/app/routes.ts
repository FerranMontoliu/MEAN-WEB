// Routes
import { Routes } from '@angular/router';

// Components
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { IncidencesComponent } from './incidences/incidences.component';
import { MyIncidencesComponent } from './my-incidences/my-incidences.component';
import { AddIncidenceComponent } from './add-incidence/add-incidence.component';
import { EditIncidenceComponent } from './edit-incidence/edit-incidence.component';
import { UserListComponent } from './user-list/user-list.component';

// Auth
import { AuthGuard } from './auth/auth.guard';


export const appRoutes: Routes = [
    {
        path: 'signup',
        component: UserComponent,
        children: [{
            path: '',
            component: SignUpComponent
        }]
    },
    {
        path: 'signin',
        component: UserComponent,
        children: [{
            path: '',
            component: SignInComponent
        }]
    },
    {
        path: 'profile',
        component: NavComponent,
        children: [{
            path: '',
            component: ProfileComponent
        }],
        canActivate: [AuthGuard]
    },
    {
        path: 'incidences',
        component: NavComponent,
        children: [{
            path: '',
            component: IncidencesComponent
        }],
        canActivate: [AuthGuard]
    },
    {
        path: 'my-incidences',
        component: NavComponent,
        children: [{
            path: '',
            component: MyIncidencesComponent
        }],
        canActivate: [AuthGuard]
    },
    {
        path: 'add-incidence',
        component: NavComponent,
        children: [{
            path: '',
            component: AddIncidenceComponent
        }],
        canActivate: [AuthGuard]
    },
    {
        path: 'edit-incidence',
        component: NavComponent,
        children: [{
            path: '',
            component: EditIncidenceComponent
        }],
        canActivate: [AuthGuard]
    },
    {
        path: 'userlist',
        component: NavComponent,
        children: [{
            path: '',
            component: UserListComponent
        }],
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/signin',
        pathMatch: 'full'
    }
];
