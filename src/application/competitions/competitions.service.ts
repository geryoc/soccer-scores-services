import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SaveCompetitionModel } from './save-competition.model';
import { Competition } from '../../domain/entities/competition.entity';
import { CompetitionModel } from '../_shared/models/competition.model';
import { CompetitionRepository } from '../../domain/interfaces/repository/competition.repository';
import { CountryRepository } from 'src/domain/interfaces/repository/country.repository';

@Injectable()
export class CompetitionsService {
  constructor(
    @Inject('CompetitionRepository')
    private readonly competitionRepository: CompetitionRepository,
    @Inject('CountryRepository')
    private readonly countryRepository: CountryRepository,
  ) {}

  async getAll(): Promise<CompetitionModel[]> {
    const allCompetitions = await this.competitionRepository.getAll();
    return allCompetitions.map((competition) =>
      CompetitionModel.fromEntity(competition),
    );
  }

  async getById(id: number): Promise<CompetitionModel> {
    const competition = await this.competitionRepository.getById(id);
    return CompetitionModel.fromEntity(competition);
  }

  async create(request: SaveCompetitionModel): Promise<CompetitionModel> {
    const country = await this.countryRepository.getById(request.countryId);

    if (!country) {
      throw new NotFoundException(
        `Country with ID ${request.countryId} not found`,
      );
    }

    const competitionEntity: Competition = {
      id: 0,
      name: request.name,
      country: country,
      competitionTeams: [],
    };

    const savedCompetition =
      await this.competitionRepository.create(competitionEntity);

    for (const teamId of request.teamIds) {
      await this.competitionRepository.createCompetitionTeam(
        savedCompetition.id,
        teamId,
      );
    }

    return this.getById(savedCompetition.id);
  }

  async update(
    id: number,
    data: SaveCompetitionModel,
  ): Promise<CompetitionModel> {
    const competition = await this.competitionRepository.getById(id);

    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }

    const country = await this.countryRepository.getById(data.countryId);

    if (!country) {
      throw new NotFoundException(
        `Country with ID ${data.countryId} not found`,
      );
    }

    competition.name = data.name;
    competition.country = country;

    await this.competitionRepository.update(competition);

    await this.competitionRepository.deleteTeams(id);
    for (const teamId of data.teamIds) {
      await this.competitionRepository.createCompetitionTeam(id, teamId);
    }

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const competition = await this.competitionRepository.getById(id);
    if (!competition) {
      throw new NotFoundException(`Competition with ID ${id} not found`);
    }
    await this.competitionRepository.deleteTeams(id);
    await this.competitionRepository.delete(id);
  }
}
