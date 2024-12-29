import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  loading = true;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams(): void {
    this.loading = true;
    this.nbaService.getTeams().subscribe({
      next: (data: any) => {
        console.log('Teams API Response:', data);
        this.teams = data.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching teams:', err);
        this.loading = false;
      },
    });
  }
}
