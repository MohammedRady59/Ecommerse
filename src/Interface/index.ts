export interface IProudcts {
  data: IProudct[];
}
export interface IProudct {
  id: number;
  qtw?: number | undefined | null;
  attributes: {
    title: string;
    descrption: string;
    price: number;
    stock: number;
    createdAt: string;
    thumbnail: {
      data?: ProductThumbnail;
    };
    category: {
      data?: ProductCategory;
    };
  };
}

export interface ProductCategory {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
  };
}
export interface ProductThumbnail {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
}

export interface IGet {
  data: IProudct;
  meta?: null;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
}
export interface ILogin {
  jwt: string;
  user: IUser;
}
export interface IFormInputs {
  identifier: string;
  password: string;
}
export interface IErrorResponse {
  error: {
    // details?: {
    //   errors: {
    //     message: string;
    //   }[];
    // };
    message?: string;
  };
}
