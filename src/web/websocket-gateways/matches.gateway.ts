import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MatchModel } from 'src/application/_shared/models/match.model';

@WebSocketGateway({ cors: true })
export class MatchesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`WebSocket MatchesGateway - Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`WebSocket MatchesGateway - Client disconnected: ${client.id}`);
  }

  emitMatchUpdated(match: MatchModel) {
    this.server.emit(`match-updated-${match.id}`, { match });
  }
}
