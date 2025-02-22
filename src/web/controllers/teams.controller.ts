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
import { SaveTeamModel } from '../../application/teams/save-team.model';
import { TeamModel } from '../../application/_shared/models/team.model';
import { TeamsService } from '../../application/teams/teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getAll(): Promise<TeamModel[]> {
    return this.teamsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<TeamModel> {
    return this.teamsService.getById(id);
  }

  @Post()
  async create(@Body() data: SaveTeamModel): Promise<TeamModel> {
    return this.teamsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: SaveTeamModel,
  ): Promise<TeamModel> {
    return this.teamsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.teamsService.delete(id);
  }
}
