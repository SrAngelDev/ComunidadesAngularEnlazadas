import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CCAA } from '../models/ccaa.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  // URL del archivo JSON remoto con toda la estructura jerárquica
  private arbolUrl = 'https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/arbol.json';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene toda la estructura jerárquica (CCAA > Provincias > Poblaciones)
   * @returns Observable con el array de comunidades autónomas incluyendo sus provincias y poblaciones
   */
  getArbol(): Observable<CCAA[]> {
    return this.http.get<CCAA[]>(this.arbolUrl);
  }
}
