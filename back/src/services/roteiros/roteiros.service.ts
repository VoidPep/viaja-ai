import { Inject, Injectable, Logger } from '@nestjs/common';
import { Roteiro } from '../../modules/roteiros/entity/roteiro.entity';
import { DataSource, Repository } from 'typeorm';
import { createApi, Language } from "unsplash-js";
import { PromptRequest } from 'src/modules/gemini/gemini.request';
import { ImagemDoRoteiro } from 'src/modules/roteiros/entity/imagem-do-roteiro.entity';
import { RoteiroResponse } from 'src/modules/roteiros/dto/roteiro.response';

@Injectable()
export class RoteirosService {
  roteiroRepository: Repository<Roteiro>;
  imagemRepository: Repository<ImagemDoRoteiro>;
  constructor(
    @Inject("DATA_SOURCE") private readonly database: DataSource,
  ) {
    this.roteiroRepository = this.database.getRepository(Roteiro);
    this.imagemRepository = this.database.getRepository(ImagemDoRoteiro);
  }

  async criarImagens(roteiros: RoteiroResponse[], request: PromptRequest): Promise<object[]> {
    const api = createApi({
      accessKey: "Client-ID qdp3gIWjG86yEIksq7zyneUSxEEh7sv-Ypzg1eo7Jko"
    });
    for(let i = 0; i <= roteiros.length - 1; i++) {
      let roteiro = roteiros[i]

      const { response } = await api.search.getPhotos({
        query: `
          ${roteiro.destino} 
          ${request.preferencias.join(', ').replace('_', ' ').toLowerCase()}
        `,
        orientation: 'landscape',
        lang: Language.Portuguese,
        perPage: 3
      })

      let links = response.results.map(r => r.links.html)
      links.forEach(async link => {
        const imagem = {
          url: link
        }

        roteiro.imagens.push(imagem)
      })
    }

    return roteiros
  }

  async getByLoggedUser(id: any) {
    return await this.roteiroRepository.find({
      where: {
        usuario: { id: id },
      },
      relations: [`usuario`, `imagens`],
    });
  }

  async create(roteiro: any) {
    return await this.roteiroRepository.save(roteiro)
  }
  async remove(id: number) {
    return await this.roteiroRepository.delete(id)
  }
}
