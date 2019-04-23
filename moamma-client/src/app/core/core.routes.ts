import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: "", component: IndexComponent , pathMatch:"full" },
  { path: "index", redirectTo: "" },
  { path: "home", redirectTo: "" }
]

export const CoreRoutes = RouterModule.forRoot(routes);
