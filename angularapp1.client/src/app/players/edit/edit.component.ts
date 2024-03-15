import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Position } from '../position';
import { PositionsService } from '../positions.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  player?: Player;
  positions: Position[] = [];
  editForm;

  constructor(
    public playersService: PlayersService,
    public positionsService: PositionsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      id: [''],
      shirtNo: ['', Validators.required],
      name: ['', Validators.required],
      positionId: [''],
      appearances: [''],
      goals: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['playerId'];

    this.positionsService.getPositions().subscribe((data: Position[]) => {
      this.positions = data;
    });

    this.playersService.getPlayer(this.id).subscribe((data: any) => {
      this.player = data;
      this.editForm.patchValue(data);
    });
  }

  onSubmit(formData: any) {
    this.playersService.updatePlayer(this.id, formData.value).subscribe(res => {
      this.router.navigateByUrl('/players/list');
    });
  }
}
