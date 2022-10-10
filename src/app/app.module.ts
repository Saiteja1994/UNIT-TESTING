import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentServiceService } from './student-service.service';
import { StudentComponent } from './student/student.component';
import { FilepipePipe } from './filepipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    FilepipePipe,
    FilepipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StudentServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
