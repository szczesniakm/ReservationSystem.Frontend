export interface Host {
  name: string;
  status: HostStatus;
}

export enum HostStatus {
  PowerOn = "Power on",
  PowerOff = "Soft off",
  DeepSleep = "Deep sleep",
  Unknown = "Unknown"
}
