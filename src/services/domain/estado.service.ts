import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { EstadoDTO } from '../../models/estadoDTO';

@Injectable()
export class EstadoService {

  constructor(public http: HttpClient){

  }

  public findAll() : Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
  }

}
