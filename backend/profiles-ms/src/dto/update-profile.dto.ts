import { CreateProfileDto } from './createProfile.dto';

export class UpdateProfileDto {
  constructor(dto: CreateProfileDto) {
    this.nickName = dto.nickName;
    this.lastName = dto.lastName;
    this.firstName = dto.firstName;
    this.phone = dto.phone;
    this.bio = dto.bio;
  }

  readonly nickName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly bio: string;
}
