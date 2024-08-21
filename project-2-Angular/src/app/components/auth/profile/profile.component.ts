import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private auth = inject(AuthService);

  title = 'Decoded ID Token';

  user$ = this.auth.user$;
  ngOnInit(): void {
    console.log(this.user$);
  }
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));
  constructor(private router: Router) {}

  goToRoot(): void {
    this.router.navigate(['/']);
  }
}
