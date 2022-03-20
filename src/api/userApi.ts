import { getApi } from "./api";
import { User as UserDto } from "@xwmtp/bingo-tournament";
import { User } from "../domain/User";
import { mockLoggedInUser } from "../domain/MockData";

export const getUser = async (): Promise<User | undefined> => {
  try {
    const userDto = await getApi().getUser();
    return mapToUser(userDto);
  } catch (error) {
    console.log(error);
    return mockLoggedInUser;
  }
};

export const mapToUser = (userDto: UserDto): User => {
  return {
    id: userDto.id,
    name: userDto.name,
    avatar: userDto.avatar,
    twitchChannel: userDto.twitchChannel,
  };
};
