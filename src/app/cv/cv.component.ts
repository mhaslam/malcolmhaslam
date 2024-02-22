import { HttpClientModule } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { LANG } from '../data-management.service';
import { CvBodyComponent } from "./cv-body/cv-body.component";
import { CvHeaderComponent } from "./cv-header/cv-header.component";
import { CvService } from './cv.service';
import { LanguageSelectorComponent } from "./language-selector/language-selector.component";


@Component({
    selector: 'app-cv',
    standalone: true,
    templateUrl: './cv.component.html',
    styleUrl: './cv.component.css',
    imports: [CvHeaderComponent, CvBodyComponent, HttpClientModule, LanguageSelectorComponent]
})
export class CvComponent implements OnInit, AfterViewChecked, OnDestroy{

    @ViewChild('printableArea') printableArea:ElementRef;    
    constructor(private cvService:CvService){}
    ngOnInit(): void {
        this.cvService.loadData(LANG.FRA);



    }  
    
    generatePdf(divToPrint: HTMLElement) {
        html2canvas(this.printableArea.nativeElement,{
            scale: 3
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('cv.pdf');
        });
    }

    ngAfterViewChecked(): void {
        this.cvService.setPrintableArea(this.printableArea);
    }
    

    ngOnDestroy(): void {

    }
}
