import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NeedDTO } from '@neadz/dtos';
import { Observable } from 'rxjs';

interface NeedsDTO {
  data: NeedDTO[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})


export class NeedService {
  constructor(private http: ApiService) {}

  private defaultStep = 20;
  private skip = 0;
  private take = this.defaultStep;

  /**
   * Get needs
   */
  get(params): Observable<NeedsDTO> {
    return this.http.get<NeedsDTO>('needs', params);
  }

  /**
   * Get all needs pagination
   */
  getAll(params): Observable<NeedsDTO> {
    this.skip = 0;
    params['skip'] = this.skip;
    params['take'] = this.take;
    return this.http.get<NeedsDTO>('needs', params);
  }

  getAllNext(): Observable<NeedsDTO> {
    const params = {};
    this.skip += this.defaultStep;
    params['skip'] = this.skip;
    params['take'] = this.take;
    return this.http.get<NeedsDTO>('needs', params);
  }

  delete(need: string): Observable<NeedDTO> {
    return this.http.delete<NeedDTO>(`needs/${need}`);
  }

  getLastThree(params): Observable<NeedsDTO> {
    this.skip = 0;
    params['skip'] = this.skip;
    params['take'] = 3;
    return this.http.get<NeedsDTO>('needs', params);
  }
}
