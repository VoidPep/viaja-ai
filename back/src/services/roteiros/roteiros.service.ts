import { Inject, Injectable, Logger } from '@nestjs/common';
import { Roteiro } from '../../modules/roteiros/entity/roteiro.entity';
import { DataSource, Repository } from 'typeorm';
import { createApi, Language } from "unsplash-js";
import { PromptRequest } from 'src/modules/gemini/gemini.request';
import { ImagemDoRoteiro } from 'src/modules/roteiros/entity/imagem-do-roteiro.entity';
import { RoteiroResponse } from 'src/modules/roteiros/dto/roteiro.response';
import { Usuario } from 'src/modules/user/entity/user.entity';

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
        lang: Language.Portuguese
      })

      const randomIndexes = this.getRandomIndexes(response.results);

      let links = response.results.map(r => r.urls.raw);
      randomIndexes.forEach(i => {
        const imagem = {
          url: links[i]
        };
      
        roteiro.imagens.push(imagem);
      });
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
    const roteiro = await this.roteiroRepository.findOne({ where: { id }, relations: ['imagens'] });

    if (!roteiro) {
        throw new Error('Roteiro não encontrado');
    }

    this.imagemRepository.remove(roteiro.imagens)
    return await this.roteiroRepository.remove(roteiro);
  }

  async salvarRoteiro(viagem: any, user: Usuario) {
    const viagensDoBanco = await Promise.all(
      viagem.imagens.map(async imagem => {
        const novaImagem = this.imagemRepository.create({ url: imagem.url });
        return await this.imagemRepository.save(novaImagem);
      })
    );
  
    const roteiro = this.roteiroRepository.create({
      dataInicio: viagem.dataInicio,
      dataFim: viagem.dataFim,
      destino: viagem.destino,
      custo_total_estimado: viagem.custo_total_estimado,
      json: viagem.json,
      usuario: user,
      imagens: viagensDoBanco,
    });
  
    const roteiroCriado = await this.roteiroRepository.save(roteiro);
  
    return { id: roteiroCriado.id };
  }

  getRandomIndexes(results: any[]): number[] {
    // Gera um array de índices de 0 até results.length - 1
    const indexes = Array.from({ length: results.length }, (_, i) => i);
  
    // Embaralha os índices
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
  
    // Retorna os três primeiros índices embaralhados
    return indexes.slice(0, 3);
  }
}
