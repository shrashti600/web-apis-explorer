export interface ApiService {
  id: string;
  title: string;
  description: string;
  swaggerUrl: string;
  link: string;
  logo: string;
  contact: { email: string; name: string; url: string };
}
