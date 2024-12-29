import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: any[] = [];
  loading = true;
  nextCursor: string | null = null;
  previousCursor: string | null = null;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.fetchGames(); // Fetch the first page
  }

  fetchGames(cursor: string = '0', startDate: string = '', endDate: string = ''): void {
    this.loading = true;
    this.nbaService.getGames(cursor, 25, startDate, endDate).subscribe({
      next: (data: any) => {
        console.log('Games API Response:', data);
        this.games = data.data || [];
        this.nextCursor = data.meta?.next_cursor || null;
        this.previousCursor = data.meta?.previous_cursor || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching games:', err);
        this.loading = false;
      },
    });
  }

  filterGames(event: Event, type: 'start' | 'end'): void {
    const inputElement = event.target as HTMLInputElement; // Fix the TypeScript error
    const value = inputElement.value; // Get the input's value

    if (type === 'start') {
      this.fetchGames('0', value, ''); // Apply the start date filter
    } else {
      this.fetchGames('0', '', value); // Apply the end date filter
    }
  }
}
