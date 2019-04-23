import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes=[
  { path: "docs/:cat", component: BlogComponent },
  { path: "blog/:cat", redirectTo: "docs/:cat" },
  { path: "docs/:cat/:id", component: ArticleComponent },
  { path: "blog/:cat/:id", redirectTo: "docs/:cat/:id"}
  // { path: "docs/:id", component: }
];

export const BlogRoutes = RouterModule.forRoot(routes);
