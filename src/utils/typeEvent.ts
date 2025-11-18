import { EventCategory } from "../domain/eventTypes";
export const eventColorMapping: Record<EventCategory, string> = {
  SOCIAL: "error.dark",    // O 'success.main' si usas el tema de Material UI
  DEPORTIVO: "success.dark",       // O 'primary.main'
  CAPACITACION: "secondary.dark",    // O 'secondary.main'
  EJECUTIVO: "primary.dark",   // O 'warning.main'
  EQUIPO: "warning.dark",      // O 'error.main'
  BENEFICO: "primary.dark",   // O 'warning.main'
    CULTURAL:"var(--home-card-button)",
  SALUD:"var(--home-card-button)"
};

export const eventShadowColor: Record<EventCategory, string> = {
  SOCIAL: "error.light",    // O 'success.main' si usas el tema de Material UI
  DEPORTIVO: "success.light",       // O 'primary.main'
  CAPACITACION: "secondary.light",    // O 'secondary.main'
  EJECUTIVO: "primary.light",   // O 'warning.main'
  EQUIPO: "warning.light",      // O 'error.main'
  BENEFICO: "primary.main",   // O 'warning.main'
    CULTURAL:"var(--home-card-button)",
  SALUD:"var(--home-card-button)"
};

export const eventShadowColor2: Record<EventCategory, string> = {
  SOCIAL:       "var(--event-type-color--social)",
  DEPORTIVO:    "var(--event-type-color--deportivo)",
  CAPACITACION: "var(--event-type-color--capacitacion)",
  EJECUTIVO:    "var(--event-type-color--ejecutivo)",
  EQUIPO:       "var(--event-type-color--equipo)",
  BENEFICO:     "var(--event-type-color--benefico)",
  CULTURAL:     "var(--event-type-color--cultural)",
  SALUD:        "var(--event-type-color--salud)"
};


// export EventsCategoryConfiguration: EventCategory2[] = []

export class PermissionsApp{
    roles: string[];
    permissions: string[];
    
    constructor(data: any) {
        this.roles = data.roles;
        this.permissions = data.permissions;
    } 
}

export type PermissionType = "EVENT" | "DIRECTIVE" | "REPORT" | "ADMIN"