import { getApi } from "./api";
import { mapToUser, User } from "../domain/User";
import { useQuery } from "react-query";
import { Role } from "@xwmtp/bingo-tournament";
import { websiteSettings } from "../Settings";
import { mockAllUsers } from "../domain/MockData";

const getUser = async (): Promise<User | undefined> => {
  const userDto = await getApi().getUser();
  return mapToUser(userDto);
};

export const useUser = () => {
  return useQuery<User | undefined, Error>("user", getUser);
};

export const signUp = async (): Promise<void> => {
  // todo remove sleep
  await sleep(2000);
  await getApi().signUp();
};

export const withdraw = async (): Promise<void> => {
  await getApi().withdraw();
};

export const addRole = async (addRole: { userId: string; role: Role }): Promise<void> => {
  await getApi().addRole({
    userId: addRole.userId,
    role: addRole.role,
  });
};

export const removeRole = async (removeRole: { userId: string; role: Role }): Promise<void> => {
  await getApi().removeRole({
    userId: removeRole.userId,
    role: removeRole.role,
  });
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const userDtos = await getApi().getAllUsers();
    return userDtos.map(mapToUser);
  } catch (error) {
    console.log(error);
    if (websiteSettings.USE_MOCK_DATA) {
      return mockAllUsers;
    }
    throw error;
  }
};

export const useAllUsers = () => {
  return useQuery<User[], Error>("allUsers", getAllUsers);
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
