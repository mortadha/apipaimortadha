import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { CommentDTO } from '@neadz/dtos';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CommentService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Create a new comment
   * @param {string} forFreelance freelance ID
   * @param {CommentDTO} comment
   * @return {Observable<CommentDTO[]>}
   */
  create(freelanceId: string, comment: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(`freelance/${freelanceId}/comment`, comment);
  }

  get(freelanceId: string): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`freelance/${freelanceId}/comment`);
  }

  /**
   * Update a comment
   * @param {CommentDTO} comment
   * @return {Observable<CommentDTO>}
   */
  update(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.patch(`freelance/comment/${comment.id}`, comment);
  }

  /**
   * Delete a comment
   * @param {string} comment ID
   * @return {Observable<void>}
   */
  delete(commentId: string): Observable<void> {

    return this.http.delete<void>(`freelance/comment/${commentId}`);
  }
}
