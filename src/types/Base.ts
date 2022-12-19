export interface BaseData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export default class Base implements BaseData {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, data: Partial<Base | BaseData>) {
    const { createdAt = new Date(), updatedAt = new Date() } = data;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isValid() {
    return this.id != 0;
  }
}
