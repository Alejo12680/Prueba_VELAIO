export interface Habilidad {
  nombre: string;
}

export interface Persona {
  nombreCompleto: string;
  edad: number;
  habilidades: Habilidad[];
}

export interface Tarea {
  nombre: string;
  fechaLimite: Date;
  completada: boolean;
  personas: Persona[];
}
