export interface Habilidad {
  nombre: string;
}

export interface Persona {
  nombre: string;
  edad: number;
  habilidades: Habilidad[];
}

export interface Tarea {
  tarea: string;
  fechaLimite: Date;
  checked?: boolean;
  personas: Persona[];
}
