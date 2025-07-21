export interface ArticleComment {
  id: number;
  title?: string;
  content: string;
  publishedAt: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
  article: {
    id: number;
  };
}

export interface CreateCommentData {
  title?: string;
  content: string;
}
