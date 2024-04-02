import { BooleanReturn, UnimplementedUsersService, UserFilter } from '@etu/events-proto'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'

export class UsersService extends UnimplementedUsersService {
  override isAdmin(
    call: ServerUnaryCall<UserFilter, BooleanReturn>,
    callback: sendUnaryData<BooleanReturn>
  ): void {
    callback(null, new BooleanReturn({ result: false }))
  }

  override isEditor(
    call: ServerUnaryCall<UserFilter, BooleanReturn>,
    callback: sendUnaryData<BooleanReturn>
  ): void {
    callback(null, new BooleanReturn({ result: false }))
  }

  override isVolunteer(
    call: ServerUnaryCall<UserFilter, BooleanReturn>,
    callback: sendUnaryData<BooleanReturn>
  ): void {
    callback(null, new BooleanReturn({ result: false }))
  }
}
