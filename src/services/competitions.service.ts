import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeepPartial, EntityManager } from 'typeorm';
import { SaveCompetitionModel } from '../models/competition/save-competition.model';
import { Competition } from '../entities/competition.entity';
import { CompetitionTeam } from '../entities/competition-team.entity';
import { CompetitionModel } from '../models/competition/competition.model';
import { Country } from '../entities/country.entity';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectEntityManager()
    private readonly database: EntityManager,
  ) {}

  async getAll(): Promise<CompetitionModel[]> {
    const allCompetitions = await this.database.find(Competition, {
      order: { id: 'ASC' },
    });
    return allCompetitions.map((competition) =>
      CompetitionModel.fromEntity(competition),
    );
  }

  async getById(id: number): Promise<CompetitionModel> {
    const competition = await this.database.findOne(Competition, {
      where: { id },
    });

    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }

    return CompetitionModel.fromEntity(competition);
  }

  async create(request: SaveCompetitionModel): Promise<CompetitionModel> {
    const country = await this.database.findOne(Country, {
      where: { id: request.countryId },
    });

    if (!country) {
      throw new NotFoundException(
        `Country with ID ${request.countryId} not found`,
      );
    }

    const competitionEntity: DeepPartial<Competition> = {
      name: request.name,
      country: country,
    };

    const savedCompetition = await this.database.save(
      Competition,
      competitionEntity,
    );

    const competitionTeams: DeepPartial<CompetitionTeam>[] =
      request.teamIds.map((teamId) => ({
        competition: { id: savedCompetition.id },
        team: { id: teamId },
      }));
    await this.database.save(CompetitionTeam, competitionTeams);

    return this.getById(savedCompetition.id);
  }

  async update(
    id: number,
    data: SaveCompetitionModel,
  ): Promise<CompetitionModel> {
    const competition = await this.database.findOne(Competition, {
      where: { id },
      relations: ['competitionTeams'],
    });

    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }

    const country = await this.database.findOne(Country, {
      where: { id: data.countryId },
    });

    if (!country) {
      throw new NotFoundException(
        `Country with ID ${data.countryId} not found`,
      );
    }

    competition.name = data.name;
    competition.country = country;

    await this.database.delete(CompetitionTeam, { competition: { id } });
    const competitionTeams: DeepPartial<CompetitionTeam>[] = data.teamIds.map(
      (teamId) => ({
        competition: { id },
        team: { id: teamId },
      }),
    );
    await this.database.save(CompetitionTeam, competitionTeams);

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.database.delete(Competition, id);
    if (result.affected === 0) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }
  }
}
