export interface CameraData {
  id: string;
  ip: string;
  name: string;
  type: string;
  club_id: string;
  region: string;
  lat: string;
  long: string;
  status: "Active" | "Inactive";
  calibration: string;
  resolution: string;
  frameRate: string;
  health: "healthy" | "unhealthy";
  online: boolean;
  lastChecked: string;
}
