export interface IAction {
  type: string;
  payload: any;
}

export interface IDBImage {
  publicId?: string;
  width?: number;
  height?: number;
  url?: string;
}

export interface IImage {
  publicId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
}

export interface ICategory {
  id: string;
  name: string;
  image?: IImage;
  description?: string;
  order: number;
  products: any[];
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}
