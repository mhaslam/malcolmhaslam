import { Component, Input, OnInit } from '@angular/core';
import { EmploymentInterface } from '../../../../data-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  @Input() employment:EmploymentInterface;

}
