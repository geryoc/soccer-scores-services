import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaveCompetitionModel } from '../../application/competitions/save-competition.model';
import { CompetitionsService } from '../../application/competitions/competitions.service';
import { CompetitionModel } from '../../application/_shared/models/competition.model';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getAll(): Promise<CompetitionModel[]> {
    return this.competitionsService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompetitionModel> {
    return this.competitionsService.getById(id);
  }

  @Post()
  async create(
    @Body() request: SaveCompetitionModel,
  ): Promise<CompetitionModel> {
    return this.competitionsService.create(request);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: SaveCompetitionModel,
  ): Promise<CompetitionModel> {
    return this.competitionsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.competitionsService.delete(id);
  }
}
