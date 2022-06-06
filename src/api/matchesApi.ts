import { getApi } from "./api";
import { mockMatchResults, mockScheduledMatches, mockUnscheduledMatches } from "../domain/MockData";
import {
  includesEntrant,
  isMatchResult,
  isScheduledMatch,
  isUnscheduledMatch,
  Match,
  MatchToAdd,
} from "../domain/Match";
import { mapToUser } from "./userApi";
import { Entrant, EntrantWithResult } from "../domain/Entrant";
import { DateTime } from "luxon";
import { useQuery } from "react-query";
import {
  Entrant as EntrantDto,
  EntrantState,
  Match as MatchDto,
  NewMatch as NewMatchDto,
} from "@xwmtp/bingo-tournament";

const mockAllMatches = [...mockUnscheduledMatches, ...mockScheduledMatches, ...mockMatchResults];

const getAllMatches = async (): Promise<Match[]> => {
  try {
    const matchDtos = await getApi().getAllMatches();
    console.log(JSON.stringify(matchDtos, null, 1));
    return matchDtos.map(mapToMatch);
  } catch (error) {
    console.log(error);
    console.log("Returning mock data with all matches");
    return mockAllMatches;
  }
};

export const useAllMatches = () => {
  return useQuery<Match[], Error>("allMatches", getAllMatches);
};

export function useFilteredMatches<T extends Match>(
  filterFn: (match: Match) => match is T,
  entrantId?: string
) {
  return useQuery<Match[], Error, T[]>("allMatches", getAllMatches, {
    select: (data) => {
      const filtered = data.filter(filterFn);
      if (entrantId) {
        return filtered.filter((match) => includesEntrant(match, entrantId));
      }
      return filtered;
    },
  });
}

export const useScheduledMatches = (entrantId?: string) => {
  return useFilteredMatches(isScheduledMatch, entrantId);
};

export const useUnscheduledMatches = (entrantId?: string) => {
  return useFilteredMatches(isUnscheduledMatch, entrantId);
};

export const useMatchResults = (entrantId?: string) => {
  return useFilteredMatches(isMatchResult, entrantId);
};

export const addMatches = async (matchesToAdd: MatchToAdd[]): Promise<Match[]> => {
  const newMatches = matchesToAdd.map(mapToNewMatchDto);
  const addedMatches = await getApi().addMatches({ requestBody: newMatches });
  return addedMatches.map(mapToMatch);
};

const mapToNewMatchDto = (matchToAdd: MatchToAdd): NewMatchDto => {
  // todo calculate entrant ranks manually
  return {
    entrantIds: [matchToAdd.entrant1.id, matchToAdd.entrant2.id],
    round: matchToAdd.round,
  };
};

const mapToMatch = (matchDto: MatchDto): Match => {
  // todo calculate entrant ranks manually
  return {
    id: matchDto.id,
    entrants: matchDto.entrants.map(mapToEntrant),
    round: matchDto.round,
    restreamChannel: "",
    scheduledTime: matchDto.scheduledTime ? DateTime.fromJSDate(matchDto.scheduledTime) : undefined,
  };
};

const mapToEntrant = (entrantDto: EntrantDto): Entrant | EntrantWithResult => {
  const entrant = {
    user: mapToUser(entrantDto.user),
  };
  if (entrantDto.state === EntrantState.PreRace) {
    return entrant;
  } else {
    return {
      ...entrant,
      result: {
        status: EntrantState.Finished ? "done" : "forfeit",
        racetimeRank: entrantDto.racetimePlace ?? 0,
        rank: entrantDto.racetimePlace ?? 0,
        finishTime: entrantDto.finishTimeSeconds,
      },
    };
  }
};
