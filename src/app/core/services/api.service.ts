import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, last } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,
              private oldHttp: Http) {}

  get<T>(path: string, params?: {}): Observable<T> {
    return this.http.get<T>(`${environment.serverUrl}/${path}`, { params: params });
  }

  post<T>(path: string, data, params: {} = {}): Observable<T> {
    return this.http.post<T>(`${environment.serverUrl}/${path}`, data, params);
  }

  upload<T>(path: string, data, params: {} = {}): Observable<T> {

    const req = new HttpRequest('POST', `${environment.serverUrl}/${path}`, data, {
      reportProgress: true,
      // observe: 'events'
    });
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, data)),
      // tap(message => this.showProgress(message)),
      last());
  }

  /**
   * Event Message
   * @param event HttpEvent
   * @param formData Files to upload
   */
  // tslint:disable-next-line: no-any
  private getEventMessage(event: HttpEvent<any>, formData) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
      return this.fileUploadProgress(event);

      case HttpEventType.Response:
      return event.body;

      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  /**
   * File Upload Progress
   * @param event HttpEvent
   */
  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  patch<T>(path: string, data): Observable<T> {
    return this.http.patch<T>(`${environment.serverUrl}/${path}`, data);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${environment.serverUrl}/${path}`);
  }

  downloadFile(path: string, token: string, fileName: string, tjm?: number, proposal?: boolean) {
    return this.oldHttp
      .get(`${environment.serverUrl}/${path}`, { headers: new Headers(
        {
          'Authorization': `Bearer ${token}`
        }),
        responseType: ResponseContentType.Blob,
        params: {
          tjm : tjm,
          proposal: proposal
        }
      })
      .pipe(map(res => {
        return {
          filename: fileName,
          data: res.blob()
        };
      }))
      .subscribe(res => {
          const url = window.URL.createObjectURL(res['data']);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = res['filename'];
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }, error => {
          console.error('download error:', JSON.stringify(error));
        });
  }
}
