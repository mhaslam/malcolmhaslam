import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopWindowComponent } from './pop-window/pop-window.component';
import { WindowsService } from './windows.service';


@Component({
  selector: 'app-pop-windows',
  standalone: true,
  imports: [PopWindowComponent, CommonModule],
  templateUrl: './pop-windows.component.html',
  styleUrl: './pop-windows.component.scss'
})
export class PopWindowsComponent implements OnInit, OnDestroy {

  windows:{};
  private subscription:Subscription;

  

  constructor(private windowsService:WindowsService){}


  ngOnInit(): void {
      this.subscription=this.windowsService.activeWindowsChanged.subscribe(()=>{
        this.windows = this.windowsService.getActiveWindows();
      })
  }
  objectKeys(obj) {
    return Object.keys(obj);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
