import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../services/datos.service';
import { CCAA } from '../models/ccaa.model';
import { Provincia } from '../models/provincia.model';
import { Poblacion } from '../models/poblacion.model';

@Component({
  selector: 'app-comunidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  // Datos completos obtenidos del servicio
  todasCCAA: CCAA[] = [];

  // Datos filtrados para mostrar en las listas
  provinciasFiltradas: Provincia[] = [];
  poblacionesFiltradas: Poblacion[] = [];

  // Selecciones actuales
  ccaaSeleccionada: string = '';
  provinciaSeleccionada: string = '';
  poblacionSeleccionada: number = -1;

  // Estados de las listas
  provinciaHabilitada: boolean = false;
  poblacionHabilitada: boolean = false;

  // Control de carga y errores
  cargando: boolean = true;
  error: string = '';

  constructor(
    private datosService: DatosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  /**
   * Carga todos los datos necesarios desde el servicio
   */
  cargarDatos(): void {
    this.cargando = true;
    this.error = '';

    this.datosService.getArbol().subscribe({
      next: (arbol) => {
        this.todasCCAA = arbol;
        this.cargando = false;
        
        console.log('Árbol de datos cargado:', {
          ccaa: this.todasCCAA.length,
          totalProvincias: this.contarProvincias(),
          totalPoblaciones: this.contarPoblaciones()
        });
        
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los datos. Por favor, verifica tu conexión a internet e intenta de nuevo.';
        console.error('Error cargando datos:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Cuenta el total de provincias en el árbol
   */
  private contarProvincias(): number {
    return this.todasCCAA.reduce((total, ccaa) => total + ccaa.provinces.length, 0);
  }

  /**
   * Cuenta el total de poblaciones en el árbol
   */
  private contarPoblaciones(): number {
    return this.todasCCAA.reduce((total, ccaa) => {
      return total + ccaa.provinces.reduce((subtotal, prov) => subtotal + prov.towns.length, 0);
    }, 0);
  }

  /**
   * Se ejecuta cuando se selecciona una comunidad autónoma
   */
  onCCAAChange(): void {
    if (this.ccaaSeleccionada) {
      // Buscar la CCAA seleccionada y obtener sus provincias
      const ccaa = this.todasCCAA.find(c => c.code === this.ccaaSeleccionada);
      this.provinciasFiltradas = ccaa ? ccaa.provinces : [];
      this.provinciaHabilitada = true;
    } else {
      this.provinciasFiltradas = [];
      this.provinciaHabilitada = false;
    }

    // Resetear selecciones inferiores
    this.provinciaSeleccionada = '';
    this.poblacionSeleccionada = -1;
    this.poblacionesFiltradas = [];
    this.poblacionHabilitada = false;
  }

  /**
   * Se ejecuta cuando se selecciona una provincia
   */
  onProvinciaChange(): void {
    if (this.provinciaSeleccionada) {
      // Buscar la provincia seleccionada y obtener sus poblaciones
      const provincia = this.provinciasFiltradas.find(p => p.code === this.provinciaSeleccionada);
      this.poblacionesFiltradas = provincia ? provincia.towns : [];
      this.poblacionHabilitada = true;
    } else {
      this.poblacionesFiltradas = [];
      this.poblacionHabilitada = false;
    }

    // Resetear selección de población
    this.poblacionSeleccionada = -1;
  }

  /**
   * Obtiene el objeto CCAA seleccionado para mostrar información
   */
  getCCAASeleccionadaInfo(): CCAA | undefined {
    return this.todasCCAA.find(ccaa => ccaa.code === this.ccaaSeleccionada);
  }

  /**
   * Obtiene el objeto Provincia seleccionado para mostrar información
   */
  getProvinciaSeleccionadaInfo(): Provincia | undefined {
    return this.provinciasFiltradas.find(prov => prov.code === this.provinciaSeleccionada);
  }

  /**
   * Obtiene el objeto Población seleccionado para mostrar información
   */
  getPoblacionSeleccionadaInfo(): Poblacion | undefined {
    return this.poblacionSeleccionada >= 0 ? this.poblacionesFiltradas[this.poblacionSeleccionada] : undefined;
  }
}
