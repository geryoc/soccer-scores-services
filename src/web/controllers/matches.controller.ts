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
import { MatchModel } from '../../application/_shared/models/match.model';
import { SaveMatchModel } from '../../application/matches/save-match.model';
import { MatchesService } from '../../application/matches/matches.service';
import { MatchesGateway } from '../gateways/matches.gateway';
import { UpdateMatchScoreModel } from '../../application/matches/update-match-score.model';

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchesGateway: MatchesGateway,
  ) {}

  @Get()
  async getAll(): Promise<MatchModel[]> {
    return this.matchesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<MatchModel> {
    return this.matchesService.getById(id);
  }

  @Post()
  async create(@Body() data: SaveMatchModel): Promise<MatchModel> {
    return this.matchesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: SaveMatchModel,
  ): Promise<MatchModel> {
    const match = await this.matchesService.update(id, data);
    this.matchesGateway.emitMatchUpdated(match);
    return match;
  }

  @Put(':id/score')
  async updateScore(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMatchScoreModel,
  ): Promise<MatchModel> {
    const match = await this.matchesService.updateScore(id, data);
    this.matchesGateway.emitMatchUpdated(match);
    return match;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.matchesService.delete(id);
  }

  @Get('today')
  async getTodayMatches(): Promise<MatchModel[]> {
    return await this.matchesService.getTodayMatches();
  }
}
