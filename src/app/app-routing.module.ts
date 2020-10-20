import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { StudentGuard } from './guards/student.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin/lessons',
    loadChildren: () => import('./lessons/lessons.module').then( m => m.LessonsPageModule),
    canActivate: [AdminGuard]
  },

  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule),
    canActivate: [StudentGuard]
  },
  {
    path: 'admin/flights',
    loadChildren: () => import('./flights/flights.module').then( m => m.FlightsPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/classes',
    loadChildren: () => import('./classes/classes.module').then( m => m.CoursesPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/instructors',
    loadChildren: () => import('./instructors/instructors.module').then( m => m.InstructorsPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'admin/users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
