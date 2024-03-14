import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkillsInterface } from '../../../../data-management.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {
  @Input()  skill: SkillsInterface; 

  constructor() { }
}
