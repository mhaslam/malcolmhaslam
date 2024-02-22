import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowInterface, WindowsEnum, WindowsService } from '../windows.service';
import { CvComponent } from '../../cv/cv.component';
import { CvService } from '../../cv/cv.service';
import { DataManagementService } from '../../data-management.service';
import { faClose, faExpand, faMinus, faPrint, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-pop-window',
  standalone: true,
  templateUrl: './pop-window.component.html',
  styleUrl: './pop-window.component.scss',
  imports: [CommonModule, CvComponent, FontAwesomeModule]
})
export class PopWindowComponent implements OnInit, OnDestroy {
  @Input() windowKey: WindowsEnum;
  @ViewChild('printIcon') printIconComponent: FaIconComponent;

  enumCoparator: any;

  private subscription: Subscription;


  isActive = false;
  isExpanded = false;
  zIndex: number = 0;
  title: string;
  position: { x: number, y: number };
  lastPosition: { x: number, y: number };
  jokePath: string = '';

  //icons
  icons = {
    refresh: faRefresh,
    print: faPrint,
    expand: faExpand,
    minus: faMinus,
    close: faClose,
  }


  constructor(private windowsService: WindowsService, private cvService: CvService, private dataManagementService: DataManagementService, @Inject(DOCUMENT) private _document: Document) {

  }

  ngOnInit(): void {
    this.enumCoparator = WindowsEnum;
    console.log("COMPARE " + this.enumCoparator.resume + " " + this.windowKey)
    const windowObject: WindowInterface = this.windowsService.getWindowObject(this.windowKey);
    this.title = windowObject.title;
    this.isActive = windowObject.isActive;
    this.zIndex = windowObject.zIndex;
    this.position = windowObject.position;
    console.log("WINDOW  " + this.windowKey + " " + this.title);

    this.subscription = this.windowsService.zIndexWindowsChanged.subscribe(() => {
      console.log(this.title + " CHANGED ");
      const window = this.windowsService.getWindowObject(this.windowKey)
      this.zIndex = window.zIndex;
      console.log(this.title + "  " + this.zIndex);
    })

    if (+this.windowKey === +WindowsEnum.joke) {
      this.jokePath = this.dataManagementService.getRandomJokePath();
    }

  }

  onClose(event: MouseEvent) {
    event.stopPropagation();
    this.windowsService.closeWindow(this.windowKey);
  }

  onWindowClick() {
    console.log(this.title);
    this.windowsService.bringToFront(this.windowKey);
  }

  startDrag($event): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    const duringDrag = (e) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
      this.lastPosition = { ...this.position };
    };

    const finishDrag = (e) => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
      this.windowsService.setPosition(this.windowKey, this.position);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }

  onCVPrint() {
    this.printIconComponent.animation  = 'spin-pulse';
    // Note that FaIconComponent.render() should be called to update the
    // rendered SVG after setting/updating component inputs.
    this.printIconComponent.render();
    this.cvService.printCV().finally(()=>{
      this.printIconComponent.animation = null;
      this.printIconComponent.render();
    });
  }

  onExpand() {
    this.isExpanded = true;
    this.position.x = 0;
    this.position.y = 0;
  }
  onMinimize() {
    this.isExpanded = false;
  }
  onRefresh() {
    this.jokePath = this.dataManagementService.getRandomJokePath();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
