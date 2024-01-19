import { StudentPickComponent } from './pages/student-pick.component';
import { MainComponent } from './pages/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path : 'main', component: MainComponent },
    { path: 'pick/:type/:id/:p', component: StudentPickComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
    })],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
