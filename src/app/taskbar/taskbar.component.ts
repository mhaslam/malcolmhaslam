import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { WindowsService, WindowsEnum} from '../pop-windows/windows.service';


@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.scss'
})
export class TaskbarComponent {

  constructor(private windowsService:WindowsService){}

  onResumeClick(){
    this.windowsService.openWindow(WindowsEnum.resume);
  }
  onWorkClick(){
    this.windowsService.openWindow(WindowsEnum.experience);
  }
  onInterestsClick(){
    this.windowsService.openWindow(WindowsEnum.interests);
  }
  onJokeClick(){
    this.windowsService.openWindow(WindowsEnum.joke);
  }
}
