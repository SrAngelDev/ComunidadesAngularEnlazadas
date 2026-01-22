import { Provincia } from './provincia.model';

/**
 * Modelo para representar una Comunidad Autónoma
 */
export interface CCAA {
  /** Código único de la comunidad autónoma */
  code: string;
  /** Nombre de la comunidad autónoma */
  label: string;
  /** Código padre (siempre "0" para CCAA) */
  parent_code: string;
  /** Array de provincias de esta comunidad autónoma */
  provinces: Provincia[];
}
