
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags?: string[];
  metaKeywords?: string;
  metaDescription?: string;
}
