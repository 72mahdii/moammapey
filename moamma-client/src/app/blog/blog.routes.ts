import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from './blog/blog.component';

const routes: Routes=[
  { path:"docs", component: BlogComponent },
  { path: "docs/:cat", component: BlogComponent },
  { path: "blog/:category", redirectTo: "docs/:category" }
  // { path: "docs/:id", component: }
];

export const BlogRoutes = RouterModule.forRoot(routes);
