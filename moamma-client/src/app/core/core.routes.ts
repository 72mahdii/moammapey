import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from './index/index.component';
import { AuthorLoginComponent } from './author-login/author-login.component';
import { CallBackComponent } from './call-back/call-back.component';

const routes: Routes = [
  { path: "", component: IndexComponent , pathMatch:"full" },
  { path: "index", redirectTo: "" },
  { path: "home", redirectTo: "" },
  { path: "auth-callback", component: CallBackComponent },
  { path: "_72_11_01", component: AuthorLoginComponent }
]

export const CoreRoutes = RouterModule.forRoot(routes);
