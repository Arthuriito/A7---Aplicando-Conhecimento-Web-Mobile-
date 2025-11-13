import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { DisposalRecordsService } from './disposal-records.service';
import { DisposalRecord } from '../../entities/disposal-record.entity';
import { WasteCategory } from '../../entities/disposal-point.entity';

@Controller('disposal-records')
export class DisposalRecordsController {
  constructor(private readonly disposalRecordsService: DisposalRecordsService) {}

  @Post()
  async create(@Body() recordData: Partial<DisposalRecord>) {
    // Validação do wasteType
    if (recordData.wasteType) {
      const validValues = Object.values(WasteCategory);
      const receivedValue = recordData.wasteType.toLowerCase().trim();
      
      const valueMap: { [key: string]: string } = {
        'plástico': 'plastic',
        'plastico': 'plastic',
        'papel': 'paper',
        'orgânico': 'organic',
        'organico': 'organic',
        'eletrônico': 'electronic',
        'eletronico': 'electronic',
        'vidro': 'glass',
        'metal': 'metal'
      };

      if (valueMap[receivedValue]) {
        recordData.wasteType = valueMap[receivedValue];
      }

      if (!validValues.includes(recordData.wasteType as WasteCategory)) {
        throw new BadRequestException(
          `wasteType deve ser: ${validValues.join(', ')}. Recebido: "${recordData.wasteType}"`
        );
      }
    }

    const result = await this.disposalRecordsService.create(recordData);
    
    // Converter de volta para português na resposta
    const reverseMap: { [key: string]: string } = {
      'plastic': 'plástico',
      'paper': 'papel',
      'organic': 'orgânico',
      'electronic': 'eletrônico',
      'glass': 'vidro',
      'metal': 'metal'
    };

    return {
      ...result,
      wasteType: reverseMap[result.wasteType] || result.wasteType
    };
  }

  @Get()
  async findAll(
    @Query('disposalPointId') disposalPointId?: string,
    @Query('wasteType') wasteType?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('userName') userName?: string,
  ) {
    const filters: any = {};

    if (disposalPointId) filters.disposalPointId = parseInt(disposalPointId);
    if (wasteType) {
      // Converter wasteType de português para inglês na consulta
      const valueMap: { [key: string]: string } = {
        'plástico': 'plastic',
        'plastico': 'plastic',
        'papel': 'paper',
        'orgânico': 'organic',
        'organico': 'organic',
        'eletrônico': 'electronic',
        'eletronico': 'electronic',
        'vidro': 'glass',
        'metal': 'metal'
      };
      filters.wasteType = valueMap[wasteType.toLowerCase().trim()] || wasteType;
    }
    if (userName) filters.userName = userName;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    const records = await this.disposalRecordsService.findAll(filters);
    
    // Converter de volta para português nas respostas
    const reverseMap: { [key: string]: string } = {
      'plastic': 'plástico',
      'paper': 'papel',
      'organic': 'orgânico',
      'electronic': 'eletrônico',
      'glass': 'vidro',
      'metal': 'metal'
    };

    return records.map(record => ({
      ...record,
      wasteType: reverseMap[record.wasteType] || record.wasteType
    }));
  }

  @Get('relatorio')
  async getReport() {
    const report = await this.disposalRecordsService.getStatistics();
    
    // Traduzir os valores do relatório
    const reverseMap: { [key: string]: string } = {
      'plastic': 'plástico',
      'paper': 'papel',
      'organic': 'orgânico',
      'electronic': 'eletrônico',
      'glass': 'vidro',
      'metal': 'metal'
    };

    return {
      ...report,
      mostFrequentWaste: reverseMap[report.mostFrequentWaste] || report.mostFrequentWaste
    };
  }
}