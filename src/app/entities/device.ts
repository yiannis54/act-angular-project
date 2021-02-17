export class Device {
  id: string;
  serialNumber: string;
  description: string;
  type: deviceType;
  employeeId?: string;

  constructor(id: string, serialNumber: string, description: string, type: deviceType, employeeId?: string) {
    this.id = id;
    this.serialNumber = serialNumber;
    this.description = description;
    this.type = type;
    this.employeeId = employeeId;
  }
}

export enum deviceType {
  LAPTOP = 'LAPTOP',
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
}
