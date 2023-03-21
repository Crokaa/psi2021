import {Fotografia} from './fotografia';


/*POR EM CONCORDANCIA COM A BASE DE DADOS*/
export interface Utilizador  {
  _id: string;
  pass: string;
  nickname: string;
  fotografias: Fotografia[]
  fotografiasFavoritos: Fotografia[]
}
