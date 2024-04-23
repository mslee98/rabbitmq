import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { onlineMap } from './onlineMap';

@WebSocketGateway({namespace: /\/ws-.+/})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() public server: Server

  @SubscribeMessage('test')
  test(
    @MessageBody() data: {},
    @ConnectedSocket() socket: Socket
  ) {

    console.log("???")

    return 'Hello world!';
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket
  ) {

    console.log()

    console.log("sssssssssssssssssss");
    console.log('만들어지냐?', data)

    return 'Hello world!';
  }

  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket
  ) {
    const newNamespace = socket.nsp;
    console.log('login', newNamespace);
    onlineMap[socket.nsp.name][socket.id] = data.id;
    newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }

  // WebSocketGateway 클래스가 최과된 후 호출
  afterInit(server: Server):any {
    // console.log(server)
    console.log('WebSocket 연결...', server.sockets.name)
  }

  // Socket과 연결될 때 마다 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('connected', socket.nsp.name);

    if(!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    socket.emit('hello', socket.nsp.name);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('연결 종료')
  }

  

  
}
