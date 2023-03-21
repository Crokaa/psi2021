import {Utilizador} from './utilizador';

/*POR EM CONCORDANCIA COM A BASE DE DADOS*/
export interface Fotografia  {
  _id: string;
  nome: string;
  descricao: string;
  data: Date;
  listaLikes: Utilizador["nickname"][];
  idUpload: Utilizador["nickname"];
  image: string;
}