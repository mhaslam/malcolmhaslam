import { Component, OnInit } from '@angular/core';
import { WindowsEnum, WindowsService } from '../pop-windows/windows.service';
import { DataManagementService } from '../data-management.service';


@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.scss'
})
export class TaskbarComponent implements OnInit{
  baseUrl:string;

  constructor(private windowsService:WindowsService, private dataManagementService:DataManagementService){}

  ngOnInit(): void {
      this.baseUrl=this.dataManagementService.baseHref;
  }
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
