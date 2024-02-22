import { Component } from '@angular/core';
import { WindowsEnum, WindowsService } from '../pop-windows/windows.service';


@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [],
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
