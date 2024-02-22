import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { PopWindowsComponent } from './pop-windows/pop-windows.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FlexLayoutModule,TaskbarComponent,PopWindowsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MalcolmHaslam';
}
