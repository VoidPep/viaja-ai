import { Inject, Injectable } from '@nestjs/common';
import { Roteiro } from '../../modules/roteiros/entity/roteiro.entity';
import { DataSource, Repository } from 'typeorm';
import { createApi, Language } from "unsplash-js";
import { PromptRequest } from 'src/modules/gemini/gemini.request';
import { ImagemDoRoteiro } from 'src/modules/roteiros/entity/imagem-do-roteiro.entity';

@Injectable()
export class RoteirosService {
  roteiroRepository: Repository<Roteiro>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.roteiroRepository = this.database.getRepository(Roteiro);
  }

  async criarImagens(roteiro: any, request: PromptRequest) {
    const api = createApi({
      accessKey: "Client-ID qdp3gIWjG86yEIksq7zyneUSxEEh7sv-Ypzg1eo7Jko"
    });

    const {response} = await api.search.getPhotos({ 
        query: `
          ${roteiro.destino} 
          ${request.preferencias.join(', ').replace('_', ' ').toLowerCase()}
        `,
        orientation: 'landscape',
        lang: Language.Portuguese,
        perPage: 3
     })

     let links = response.results.map(r => r.links.html)
     let imagens: ImagemDoRoteiro[] = [];
     links.forEach(link => {
      imagens.push({ url: link } as ImagemDoRoteiro)
     })

     return imagens
  }

  async getByLoggedUser(id: any) {
    return await this.roteiroRepository.find({
      where: {
        usuario: { id: id },
      },
      relations: ['usuario'],
    });
  }

  async create(roteiro: any) {
    return await this.roteiroRepository.save(roteiro)
  }
  async remove(id: number) {
    return await this.roteiroRepository.delete(id)
  }
}
