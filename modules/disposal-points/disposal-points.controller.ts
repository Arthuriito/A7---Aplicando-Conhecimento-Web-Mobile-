import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { DisposalPointsService } from './disposal-points.service';
import { DisposalPoint, LocationType, WasteCategory } from '../../entities/disposal-point.entity';

@Controller('disposal-points')
export class DisposalPointsController {
  constructor(private readonly disposalPointsService: DisposalPointsService) {}

  @Post()
  async create(@Body() disposalPointData: Partial<DisposalPoint>) {
    console.log('Dados recebidos RAW:', disposalPointData);
    console.log('LocationType recebido:', disposalPointData.locationType);
    console.log('Tipo:', typeof disposalPointData.locationType);
    
    // Validação FLEXÍVEL do locationType
    if (disposalPointData.locationType) {
      const receivedValue = disposalPointData.locationType.toString().toLowerCase().trim();
      console.log('Valor normalizado:', receivedValue);
      
      // Mapeamento amplo de possíveis valores
      const locationMap: { [key: string]: string } = {
        'publico': 'public',
        'público': 'public',
        'public': 'public',
        'p�blico': 'public', // Para o caso de encoding corrompido
        'privado': 'private', 
        'private': 'private',
        'privad': 'private',
        'p�blic': 'public'
      };

      const mappedValue = locationMap[receivedValue];
      
      if (mappedValue) {
        disposalPointData.locationType = mappedValue;
        console.log('Valor mapeado para:', mappedValue);
      } else {
        throw new BadRequestException(
          `locationType inválido. Use "public" ou "private". Recebido: "${disposalPointData.locationType}"`
        );
      }
    }

    // Validação FLEXÍVEL das categorias
    if (disposalPointData.acceptedCategories) {
      const categoryMap: { [key: string]: string } = {
        'plástico': 'plastic',
        'plastico': 'plastic',
        'plastic': 'plastic',
        'papel': 'paper',
        'paper': 'paper',
        'orgânico': 'organic',
        'organico': 'organic',
        'organic': 'organic',
        'eletrônico': 'electronic',
        'eletronico': 'electronic',
        'electronic': 'electronic',
        'vidro': 'glass',
        'glass': 'glass',
        'metal': 'metal',
        'metAL': 'metal'
      };

      disposalPointData.acceptedCategories = disposalPointData.acceptedCategories.map(cat => {
        const normalizedCat = cat.toString().toLowerCase().trim();
        const mappedCat = categoryMap[normalizedCat];
        
        if (!mappedCat) {
          throw new BadRequestException(
            `Categoria inválida: "${cat}". Use: plastic, paper, organic, electronic, glass, metal`
          );
        }
        
        return mappedCat;
      });
      
      console.log('Categorias mapeadas:', disposalPointData.acceptedCategories);
    }

    console.log('Dados FINAIS para salvar:', disposalPointData);
    return await this.disposalPointsService.create(disposalPointData);
  }

  @Get()
  async findAll() {
    const points = await this.disposalPointsService.findAll();
    
    // Converter de volta para português na resposta
    return points.map(point => ({
      ...point,
      locationType: point.locationType === 'public' ? 'público' : 'privado',
      acceptedCategories: point.acceptedCategories.map(cat => {
        const reverseMap: { [key: string]: string } = {
          'plastic': 'plástico',
          'paper': 'papel',
          'organic': 'orgânico',
          'electronic': 'eletrônico',
          'glass': 'vidro',
          'metal': 'metal'
        };
        return reverseMap[cat] || cat;
      })
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const point = await this.disposalPointsService.findOne(+id);
    if (point) {
      return {
        ...point,
        locationType: point.locationType === 'public' ? 'público' : 'privado',
        acceptedCategories: point.acceptedCategories.map(cat => {
          const reverseMap: { [key: string]: string } = {
            'plastic': 'plástico',
            'paper': 'papel',
            'organic': 'orgânico',
            'electronic': 'eletrônico',
            'glass': 'vidro',
            'metal': 'metal'
          };
          return reverseMap[cat] || cat;
        })
      };
    }
    return point;
  }
}