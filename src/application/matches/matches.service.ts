import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Match } from '../../domain/entities/match.entity';
import { MatchModel } from '../_shared/models/match.model';
import { Team } from '../../domain/entities/team.entity';
import { Competition } from '../../domain/entities/competition.entity';
import { SaveMatchModel } from '../../application/matches/save-match.model';
import { MatchRepository } from '../../domain/interfaces/repository/match.repository';
import { TeamRepository } from '../../domain/interfaces/repository/team.repository';
import { CompetitionRepository } from '../../domain/interfaces/repository/competition.repository';
import { UpdateMatchScoreModel } from './update-match-score.model';

@Injectable()
export class MatchesService {
  constructor(
    @Inject('MatchRepository')
    private readonly matchRepository: MatchRepository,
    @Inject('TeamRepository')
    private readonly teamRepository: TeamRepository,
    @Inject('CompetitionRepository')
    private readonly competitionRepository: CompetitionRepository,
  ) {}

  async getAll(): Promise<MatchModel[]> {
    const matches = await this.matchRepository.getAll();
    return matches.map((match) => MatchModel.fromEntity(match));
  }

  async getById(id: number): Promise<MatchModel> {
    const match = await this.matchRepository.getById(id);
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return MatchModel.fromEntity(match);
  }

  async create(data: SaveMatchModel): Promise<MatchModel> {
    return await this.saveMatch(new Match(), data);
  }

  async update(id: number, data: SaveMatchModel): Promise<MatchModel> {
    const existingMatch = await this.matchRepository.getById(id);
    if (!existingMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return await this.saveMatch(existingMatch, data);
  }

  async delete(id: number): Promise<void> {
    const match = await this.matchRepository.getById(id);
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    await this.matchRepository.delete(id);
  }

  private async saveMatch(matchEntity: Match, data: SaveMatchModel) {
    Object.assign(matchEntity, data);

    const matchDate = new Date(data.date);
    if (isNaN(matchDate.getTime())) {
      throw new Error(
        'Invalid match date provided. Ensure it includes timezone information.',
      );
    }
    matchEntity.matchDate = matchDate;

    const localTeam = await this.teamRepository.getById(data.localTeamId);
    const awayTeam = await this.teamRepository.getById(data.awayTeamId);
    const competition = await this.competitionRepository.getById(
      data.competitionId,
    );

    this.ValidateMatchDependencies(localTeam, awayTeam, competition);

    matchEntity.localTeam = localTeam!;
    matchEntity.awayTeam = awayTeam!;
    matchEntity.competition = competition!;

    const savedMatch = await this.matchRepository.create(matchEntity);

    return MatchModel.fromEntity(savedMatch);
  }

  async updateScore(
    matchId: number,
    data: UpdateMatchScoreModel,
  ): Promise<MatchModel> {
    const match = await this.matchRepository.getById(matchId);

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    match.localScore = data.localScore;
    match.awayScore = data.awayScore;

    await this.matchRepository.update(match);

    return MatchModel.fromEntity(match);
  }

  private ValidateMatchDependencies(
    localTeam: Team | null,
    awayTeam: Team | null,
    competition: Competition | null,
  ) {
    if (!localTeam || !awayTeam || !competition) {
      throw new BadRequestException(
        'Invalid dependencies. Some entity not found',
      );
    }

    if (localTeam.id === awayTeam.id) {
      throw new BadRequestException('Local and away team cannot be the same');
    }

    if (
      !competition.competitionTeams.some((ct) => ct.team.id === localTeam.id)
    ) {
      throw new BadRequestException(
        'Local team is not part of the competition',
      );
    }

    if (
      !competition.competitionTeams.some((ct) => ct.team.id === awayTeam.id)
    ) {
      throw new BadRequestException('Away team is not part of the competition');
    }
  }
}
