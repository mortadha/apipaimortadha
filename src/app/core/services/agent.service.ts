import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AccountDTO } from '@neadz/dtos';



@Injectable()
export class AgentService {

    constructor(private http: ApiService) {
        this.http = http;
      }

    getMe(): Observable<AccountDTO> {
        return this.http.get(`accounts/me`);
    }

    updateAgent(agent: AccountDTO): Observable<AccountDTO> {
        return this.http.patch(`accounts/${agent.id}`, agent);
    }
}
