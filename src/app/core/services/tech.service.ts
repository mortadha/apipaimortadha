import { Injectable } from '@angular/core';
import { TechDTO } from '@neadz/dtos';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TechsDTO {
  data: TechDTO[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})

export class TechService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  getAll(): Observable<TechDTO[]> {
    return this.http.get<TechsDTO>('techs')
      .pipe(map((res) => {
        return res.data;
      }));
  }
}
