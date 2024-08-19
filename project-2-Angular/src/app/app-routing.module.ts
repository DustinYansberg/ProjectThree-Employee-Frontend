import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './Services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          children: [
            {
              path: '',
              /*canActivate: [AuthGuard],*/ loadChildren: () =>
                import('./components/dashboard/dashboard.module').then(
                  (m) => m.DashboardModule
                ),
            },
            {
              path: 'employees',
              /*canActivate: [AuthGuard],*/ loadChildren: () =>
                import('./components/employees/employees.module').then(
                  (m) => m.EmployeesModule
                ),
            },
            {
              path: 'employeedetail/:id',
              /*canActivate: [AuthGuard],*/ loadChildren: () =>
                import(
                  './components/employee-detail/employee-detail.module'
                ).then((m) => m.EmployeeDetailModule),
            },
            {
              path: 'accounts',
              /*canActivate: [AuthGuard],*/ loadChildren: () =>
                import('./components/accounts/accounts.module').then(
                  (m) => m.AccountsModule
                ),
            },
            {
              path: 'accountdetail/:id',
              /*canActivate: [AuthGuard],*/ loadChildren: () =>
                import(
                  './components/account-detail/account-detail.module'
                ).then((m) => m.AccountDetailModule),
            },
            {
              path: 'uikit',
              loadChildren: () =>
                import('./demo/components/uikit/uikit.module').then(
                  (m) => m.UIkitModule
                ),
            },
            {
              path: 'utilities',
              loadChildren: () =>
                import('./demo/components/utilities/utilities.module').then(
                  (m) => m.UtilitiesModule
                ),
            },
            {
              path: 'documentation',
              loadChildren: () =>
                import(
                  './demo/components/documentation/documentation.module'
                ).then((m) => m.DocumentationModule),
            },
            {
              path: 'blocks',
              loadChildren: () =>
                import('./demo/components/primeblocks/primeblocks.module').then(
                  (m) => m.PrimeBlocksModule
                ),
            },
            {
              path: 'pages',
              loadChildren: () =>
                import('./demo/components/pages/pages.module').then(
                  (m) => m.PagesModule
                ),
            },

            // Auth0 Paths
            // {
            //   path: 'profile',
            //   loadChildren: () =>
            //     import('./features/profile/profile.module').then(
            //       (m) => m.ProfileModule
            //     ),
            // },
            // {
            //   path: 'public',
            //   loadChildren: () =>
            //     import('./features/public/public.module').then(
            //       (m) => m.PublicModule
            //     ),
            // },
            // {
            //   path: 'protected',
            //   loadChildren: () =>
            //     import('./features/protected/protected.module').then(
            //       (m) => m.ProtectedModule
            //     ),
            // },
            // {
            //   path: 'admin',
            //   loadChildren: () =>
            //     import('./features/admin/admin.module').then(
            //       (m) => m.AdminModule
            //     ),
            // },
            {
              path: 'callback',
              loadChildren: () =>
                import('./components/auth/callback/callback.module').then(
                  (m) => m.CallbackModule
                ),
            },
            //   {
            //     path: '**',
            //     loadChildren: () =>
            //       import('./features/not-found/not-found.module').then(
            //         (m) => m.NotFoundModule
            //       ),
            //   },
          ],
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('./components/auth/auth.module').then((m) => m.AuthModule),
        },
        {
          path: 'landing',
          loadChildren: () =>
            import('./components/landing/landing.module').then(
              (m) => m.LandingModule
            ),
        },
        // { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
