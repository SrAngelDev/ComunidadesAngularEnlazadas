# 🗺️ Comunidades Autónomas de España - Listas Enlazadas

Aplicación Angular con componentes standalone que implementa listas enlazadas de Comunidades Autónomas, Provincias y Poblaciones de España.

## 🚀 Características

- ✅ **Listas en cascada**: Tres niveles de selección jerárquica
- ✅ **Estructura jerárquica**: Datos organizados en árbol (CCAA > Provincias > Poblaciones)
- ✅ **Carga optimizada**: Un único archivo JSON con toda la información
- ✅ **Datos remotos**: Carga datos desde repositorio de GitHub
- ✅ **Diseño responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Manejo de errores**: Gestión robusta de errores de carga
- ✅ **Interfaz moderna**: Diseño atractivo con degradados y animaciones

## 📋 Funcionalidades Implementadas

### Al cargar la página:
- Se obtiene la estructura completa desde el archivo arbol.json
- Los datos se procesan manteniendo la jerarquía (CCAA → Provincias → Poblaciones)
- La primera lista (Comunidades Autónomas) se habilita automáticamente
- Las listas 2 y 3 permanecen deshabilitadas

### Al seleccionar una CCAA:
- Se habilita la segunda lista (Provincias)
- Se accede directamente al array de provincias de esa comunidad
- Se limpia y deshabilita la tercera lista

### Al seleccionar una Provincia:
- Se habilita la tercera lista (Poblaciones)
- Se accede directamente al array de poblaciones de esa provincia

### Información adicional:
- Debajo de las listas se muestra información detallada del elemento seleccionado
- Incluye nombre, código y relaciones jerárquicas
- Procesamiento eficiente gracias a la estructura anidada de datos

## 🛠️ Tecnologías Utilizadas

- **Angular 19** (Standalone Components)
- **TypeScript**
- **RxJS** para programación reactiva
- **HttpClient** para peticiones HTTP
- **CSS3** con animaciones y gradientes

## 📁 Estructura del Proyecto

```
src/app/
├── components/
│   ├── comunidades.component.ts      # Componente principal
│   ├── comunidades.component.html    # Template del componente
│   └── comunidades.component.css     # Estilos del componente
├── models/
│   ├── ccaa.model.ts                 # Modelo de Comunidad Autónoma
│   ├── provincia.model.ts            # Modelo de Provincia
│   └── poblacion.model.ts            # Modelo de Población
├── services/
│   └── datos.service.ts              # Servicio de datos HTTP
├── app.config.ts                     # Configuración de la app
├── app.routes.ts                     # Rutas de la aplicación
└── app.ts                            # Componente raíz
```

## 🔧 Configuración

El proyecto utiliza HttpClient que está configurado en [app.config.ts](src/app/app.config.ts):

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()  // ← Habilitado para peticiones HTTP
  ]
};
```

## 📡 Fuentes de Datos

Los datos se obtienen de un único archivo JSON con estructura jerárquica:

- **Árbol completo**: `https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/arbol.json`

Este archivo contiene toda la información organizada en una estructura anidada:
- CCAA → Provincias → Poblaciones

## 🎨 Características de Diseño

- **Gradientes modernos**: Degradados atractivos en las listas y tarjetas
- **Animaciones suaves**: Transiciones y efectos hover
- **Estados visuales**: Diferenciación clara entre listas habilitadas/deshabilitadas
- **Responsive**: Diseño adaptable a móviles, tablets y escritorio
- **Spinner de carga**: Indicador visual durante la carga de datos

## 🚦 Cómo Usar

1. **Iniciar el servidor de desarrollo**:
   ```bash
   npm start
   ```

2. **Abrir el navegador**:
   La aplicación estará disponible en `http://localhost:4200/`

3. **Interactuar con las listas**:
   - Selecciona una Comunidad Autónoma
   - Elige una Provincia de esa comunidad
   - Selecciona una Población de esa provincia
   - Observa la información detallada debajo

## 🔍 Modelos de Datos

### CCAA (Comunidad Autónoma)
```typescript
interface CCAA {
  code: string;           // Código único
  label: string;          // Nombre de la comunidad
  parent_code: string;    // Código padre ("0" para CCAA)
  provinces: Provincia[]; // Array de provincias
}
```

### Provincia
```typescript
interface Provincia {
  code: string;        // Código único
  label: string;       // Nombre de la provincia
  parent_code: string; // Código de la CCAA a la que pertenece
  towns: Poblacion[];  // Array de poblaciones
}
```

### Población
```typescript
interface Poblacion {
  code: string;        // Código único
  label: string;       // Nombre de la población
  parent_code: string; // Código de la provincia a la que pertenece
}
```

## 🎯 Mejoras Implementadas

- ✅ Arquitectura optimizada con estructura jerárquica
- ✅ Carga única de datos (mejora de rendimiento)
- ✅ Acceso directo a datos anidados (sin filtrados costosos)
- ✅ Manejo robusto de errores con mensajes informativos
- ✅ Detección de cambios forzada para actualización inmediata
- ✅ Botón de reintentar en caso de error
- ✅ Spinner de carga mientras se obtienen los datos
- ✅ Reseteo en cascada de las selecciones
- ✅ Diseño visual atractivo con gradientes y sombras
- ✅ Animaciones suaves en las transiciones
- ✅ Información detallada con tarjetas animadas

## 📝 Notas

- La aplicación utiliza componentes standalone de Angular 19
- No requiere módulos NgModule tradicionales
- Implementa buenas prácticas de Angular
- Código completamente tipado con TypeScript
- Diseño mobile-first responsive
- Estructura de datos jerárquica optimizada para rendimiento
- Procesamiento eficiente sin necesidad de filtrados complejos

## 👨‍💻 Desarrollo

Para ejecutar en modo desarrollo:
```bash
npm start
```

Para compilar para producción:
```bash
npm run build
```

---

**¡Disfruta explorando las comunidades autónomas de España! 🇪🇸**
