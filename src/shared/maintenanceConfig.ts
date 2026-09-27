export const MAINTENANCE_COOKIE = "nexus_site_access";

export function isMaintenanceEnabled(): boolean {
  return process.env.MAINTENANCE_MODE === "true";
}

export function getMaintenanceBypassSecret(): string | undefined {
  return process.env.MAINTENANCE_BYPASS_SECRET?.trim() || undefined;
}
