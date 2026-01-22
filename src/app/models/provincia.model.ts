import { Poblacion } from './poblacion.model';

/**
 * Modelo para representar una Provincia
 */
export interface Provincia {
  /** Código único de la provincia */
  code: string;
  /** Nombre de la provincia */
  label: string;
  /** Código de la comunidad autónoma a la que pertenece */
  parent_code: string;
  /** Array de poblaciones de esta provincia */
  towns: Poblacion[];
}
