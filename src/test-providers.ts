import { provideZonelessChangeDetection } from '@angular/core';

/**
 * Proveedores globales del TestBed (alineados con producción: zoneless).
 * Referenciado desde angular.json → test.options.providersFile
 */
export default [provideZonelessChangeDetection()];
