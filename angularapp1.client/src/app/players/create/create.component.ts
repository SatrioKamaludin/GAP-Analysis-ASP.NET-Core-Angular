import { Component, OnInit } from '@angular/core';
import { Position } from '../position';
import { PlayersService } from '../players.service';
import { PositionsService } from '../positions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  positions: Position[] = [];
  createForm;

  constructor(
    public playersService: PlayersService,
    public positionsService: PositionsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      shirtNo: ['', Validators.required],
      name: ['', Validators.required],
      positionId: [''],
      appearances: [''],
      goals: [''],
    });
  }

  ngOnInit(): void {
    this.positionsService.getPositions().subscribe((data: Position[]) => {
      this.positions = data;
    });
  }

  onSubmit(formData: any) {
    this.playersService.createPlayer(formData.value).subscribe(res => {
      this.router.navigateByUrl('players/list');
    });
  }
}
