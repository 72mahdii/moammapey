import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from './index/index.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { AuthGuard } from '../guards/auth.guard';

const children: Routes =[
  { path: "repository", component: ArticlesListComponent },
  { path: "archive", component: ArchiveComponent },
  { path: "trash", component: TrashComponent}
];

const routes : Routes =[
  { path: "authors/index", component: IndexComponent, children: children
  , canActivate: [AuthGuard] },
];

export const AuthRoutes = RouterModule.forRoot(routes);
