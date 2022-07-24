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

export interface IOptionItem {
  id: string;
  optionSet: string;
  name: string;
  order: number;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface IOptionSet {
  id: string;
  name: string;
  isEnabled: boolean;
  items: IOptionItem[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface IProduct {
  id: string;
  category: ICategory;
  optionSets: any[];
  name: string;
  description?: string;
  image?: IImage;
  price: number;
  hasDiscount: boolean;
  isNew: boolean;
  hasVariant: boolean;
  varianTitle?: string;
  published: boolean;
  views: number;
}

export interface IAllCategoriesResponse {
  ok: boolean;
  categories: ICategory[];
}

export interface IAllOptionsetsResponse {
  ok: boolean;
  optionSets: IOptionSet[];
}

export interface IAllProductsResponse {
  ok: boolean;
  products: IProduct[];
}
