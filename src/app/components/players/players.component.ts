import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  players: any[] = [];
  loading = true;
  nextCursor: string | null = null;
  previousCursor: string | null = null;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.fetchPlayers(); // Fetch the first page
  }

  fetchPlayers(cursor: string = '0', search: string = ''): void {
    this.loading = true;
    this.nbaService.getPlayers(cursor, 25, search).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);
        this.players = data.data || [];
        this.nextCursor = data.meta?.next_cursor || null;
        this.previousCursor = data.meta?.previous_cursor || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
        this.loading = false;
      },
    });
  }

  searchPlayers(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Fix the TypeScript error
    const query = inputElement.value; // Get the input's value
    this.fetchPlayers('0', query); // Perform the search
  }
}
