import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from './index/index.component';
import { AuthorLoginComponent } from './author-login/author-login.component';

const routes: Routes = [
  { path: "", component: IndexComponent , pathMatch:"full" },
  { path: "index", redirectTo: "" },
  { path: "home", redirectTo: "" },
  { path: "_72_01_02", component: AuthorLoginComponent }
]

export const CoreRoutes = RouterModule.forRoot(routes);
