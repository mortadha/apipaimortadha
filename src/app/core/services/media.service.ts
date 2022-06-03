import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MediaDTO } from '@neadz/dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MediaService {
  constructor(private http: ApiService) {}

  /**
   * Upload file
   */
  upload(formData: FormData) {
    return this.http.post('medias', formData);
  }

  getMediaStrongbox(): Observable<MediaDTO[]> {
    return this.http.get('medias/strongbox');
  }
}
