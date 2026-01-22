/**
 * Modelo para representar una Población
 */
export interface Poblacion {
  /** Código único de la población */
  code: string;
  /** Nombre de la población */
  label: string;
  /** Código de la provincia a la que pertenece */
  parent_code: string;
}
