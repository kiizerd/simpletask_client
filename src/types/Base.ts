import { type Status } from "./types";

export interface BaseData {
  id: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export default class Base implements BaseData {
  id: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, data: Partial<Base | BaseData>) {
    const {
      status = "unknown",
      createdAt = new Date(),
      updatedAt = new Date(),
    } = data;
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isValid(): boolean {
    return this.id !== 0;
  }

  isComplete(): boolean {
    return this.status === "complete";
  }

  isActive(): boolean {
    return this.status === "active";
  }

  toggleCompletion(): Status {
    if (this.isComplete()) {
      this.status = "standby";
    } else {
      this.status = "complete";
    }

    return this.status;
  }
}
