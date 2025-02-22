import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Team } from '../../domain/entities/team.entity';
import { SaveTeamModel } from './save-team.model';
import { TeamModel } from '../_shared/models/team.model';
import { TeamRepository } from '../../domain/interfaces/repository/team.repository';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('TeamRepository')
    private readonly teamRepository: TeamRepository,
  ) {}

  async getAll(): Promise<TeamModel[]> {
    const teams = await this.teamRepository.getAll();
    return teams.map((team) => TeamModel.fromEntity(team));
  }

  async getById(id: number): Promise<TeamModel> {
    const team = await this.teamRepository.getById(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async create(data: SaveTeamModel): Promise<TeamModel> {
    const newTeam = new Team();
    Object.assign(newTeam, data);
    return this.teamRepository.create(newTeam);
  }

  async update(id: number, data: SaveTeamModel): Promise<TeamModel> {
    const team = await this.teamRepository.getById(id);
    Object.assign(team, data);
    return this.teamRepository.update(team);
  }

  async delete(id: number): Promise<void> {
    const existingTeam = await this.teamRepository.getById(id);
    if (!existingTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    await this.teamRepository.delete(id);
  }
}
