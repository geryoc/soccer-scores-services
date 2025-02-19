import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { SaveTeamModel } from '../models/team/save-team.model';
import { TeamModel } from '../models/team/team.model';
import { EntityManager } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectEntityManager()
    private readonly database: EntityManager,
  ) {}

  async getAll(): Promise<TeamModel[]> {
    const teams = await this.database.find(Team, { order: { id: 'ASC' } });
    return teams.map((team) => TeamModel.fromEntity(team));
  }

  async getById(id: number): Promise<TeamModel> {
    const team = await this.database.findOne(Team, { where: { id } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async create(data: SaveTeamModel): Promise<TeamModel> {
    const newTeam = new Team();
    Object.assign(newTeam, data);
    return this.database.save(newTeam);
  }

  async update(id: number, data: SaveTeamModel): Promise<TeamModel> {
    const team = await this.getById(id);
    Object.assign(team, data);
    return this.database.save(team);
  }

  async delete(id: number): Promise<void> {
    const result = await this.database.delete(Team, id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }
}
