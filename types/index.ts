export interface Material {
  productID: number;
  count: number;
}

export interface ProductResponse {
  name: string;
  id: number;
  imageURL: string;
  materials: Material[];
}

export interface Product extends ProductResponse {
  amount: number;
  craftable?: boolean;
  owned?: boolean;
}

export interface Notification {
  id: string;
  variant: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
}
