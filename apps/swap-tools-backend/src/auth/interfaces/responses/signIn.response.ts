import { ApiProperty, ApiResponse } from "@nestjs/swagger";


export class SignInResponse {

    @ApiProperty()
    access_token: string;
}