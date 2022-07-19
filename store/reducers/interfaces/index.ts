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
