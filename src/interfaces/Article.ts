export interface Article {
  id: number;
  title: string;
  description: string;
  cardImage?: string;
  contentMD: string;
  price: number;
  publishedAt: string;
  author: {
    id: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
}

export interface EditFormData {
  title: string;
  description: string;
  cardImage: string;
  contentMD: string;
  price: string;
}
