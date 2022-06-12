import { Container } from "../components/Container";
import React from "react";
import { toLeaderboardEntries } from "../domain/Leaderboard";
import { UserDisplay } from "../components/UserDisplay";
import styled from "styled-components";
import { FlexDiv } from "../components/divs/FlexDiv";
import { Colors } from "../GlobalStyle";
import { useUser } from "../api/userApi";
import { Duration } from "luxon";
import { useAllEntrants } from "../api/entrantsApi";
import { NothingToDisplay } from "../components/general/NothingToDisplay";
import { useMatchResults } from "../api/matchesApi";
import { Block } from "../components/Block";

export const LeaderboardPage: React.FC = () => {
  const { data: user } = useUser();
  const { data: allEntrants } = useAllEntrants();
  const { data: matchResults } = useMatchResults();

  const title = "Leaderboard";

  if (!allEntrants || !matchResults) {
    return (
      <Container title={title}>
        <NothingToDisplay>
          <p>Cannot display leaderboard.</p>
        </NothingToDisplay>
      </Container>
    );
  }

  const entries = toLeaderboardEntries(allEntrants, matchResults);
  const sortedEntries = entries.sort((a, b) => b.points - a.points);

  if (entries.length === 0) {
    return (
      <Container title={title}>
        <NothingToDisplay>
          <p>No entrants to display (yet).</p>
        </NothingToDisplay>
      </Container>
    );
  }

  return (
    <Container title={title}>
      <LeaderboardHeader>
        <HiddenRankAndUser>
          <Rank>0</Rank>
          <UserDisplay size="big" user={entries[0].user} wideScreenOnlyName={true} />
        </HiddenRankAndUser>

        <Number>Points</Number>
        <Time>Median</Time>
        <Number>Rounds</Number>
        <Number>Forfeits</Number>
      </LeaderboardHeader>

      {sortedEntries.map((entry, index) => {
        return (
          <LeaderboardEntry
            key={index}
            $displayAsLoggedInUser={!!user && entry.user.id === user.id}
          >
            <RankAndUser>
              <Rank>{index + 1}</Rank>
              <UserDisplay size="big" user={entry.user} wideScreenOnlyName={true} />
            </RankAndUser>

            <Number>{entry.points}</Number>
            <Time>
              {entry.median
                ? Duration.fromObject({ seconds: entry.median }).toFormat("hh:mm:ss")
                : "--:--:--"}
            </Time>
            <Number>{entry.roundsPlayed}</Number>
            <Number>{entry.forfeits}</Number>
          </LeaderboardEntry>
        );
      })}
    </Container>
  );
};

const LeaderboardHeader = styled(Block)`
  justify-content: space-between;
  background-color: transparent;
  margin-top: 0;
  font-weight: bold;
  font-size: 1rem;
`;

const LeaderboardEntry = styled(Block)<{
  $displayAsLoggedInUser: boolean;
}>`
  justify-content: space-between;
  background-color: ${({ $displayAsLoggedInUser }) =>
    $displayAsLoggedInUser ? Colors.brightGrey : Colors.lightGray};
  font-size: 1.1rem;
`;

const RankAndUser = styled(FlexDiv)`
  justify-content: flex-start;
`;

const HiddenRankAndUser = styled(RankAndUser)`
  visibility: hidden;
`;

const Number = styled.p`
  text-align: center;
  min-width: 6rem;
`;

const Time = styled.p`
  text-align: center;
  min-width: 6rem;
`;

const Rank = styled.p`
  text-align: center;
  min-width: 2rem;
  margin-right: 1.5rem;
`;
