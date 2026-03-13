
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags?: string[];
}
