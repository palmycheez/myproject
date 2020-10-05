import { Routes } from '@angular/router';
import { CreateSegmentComponent } from 'app/pages/create-segment/create-segment.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UserComponent } from '../../pages/user/user.component';
import { UploadExcelComponent } from '../../pages/upload-excel/upload-excel.component';

export const AdminLayoutRoutes: Routes = [


  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TableComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "create", component: CreateSegmentComponent },
  { path: "uploadExcel", component: UploadExcelComponent },
];
