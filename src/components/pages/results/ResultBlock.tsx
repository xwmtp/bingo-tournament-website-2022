import React from "react";
import styled from "styled-components";
import { MatchResult } from "../../../domain/Match";
import { FlexDiv } from "../../divs/FlexDiv";
import { Colors, ScreenWidths } from "../../../GlobalStyle";
import { UserDisplay } from "../../UserDisplay";
import { EntrantWithResult, getResultString } from "../../../domain/Entrant";
import { RacetimeButton } from "../../forms/buttons/RacetimeButton";
import { TwitchButton } from "../../forms/buttons/TwitchButton";
import { tournamentSettings } from "../../../TournamentSetings";

interface Props {
  result: MatchResult;
}

export const ResultBlock: React.FC<Props> = ({ result }) => {
  return (
    <ResultBlockContainer>
      <Entrants>
        {result.entrants.map((entrant) => (
          <ResultRow key={result.id + entrant.user.id} entrant={entrant} />
        ))}
      </Entrants>

      <ButtonsDiv>
        <TwitchButtonStyled
          text="Restream"
          url={result.restreamChannel && "https://www.twitch.tv/" + result.restreamChannel}
        />

        <RacetimeButtonStyled
          text="racetime.gg"
          url={`https://www.racetime.gg/${tournamentSettings.RACETIME_CATEGORY}/${result.id}`}
        />
      </ButtonsDiv>
    </ResultBlockContainer>
  );
};

export const ResultRow: React.FC<{ entrant: EntrantWithResult }> = ({ entrant }) => {
  return (
    <EntrantResult>
      <Rank>{`${entrant.result.rank}.`}</Rank>
      <UserDisplay user={entrant.user} />

      <RaceResult>{getResultString(entrant.result)}</RaceResult>
    </EntrantResult>
  );
};

const ResultBlockContainer = styled(FlexDiv)`
  justify-content: space-between;
  background-color: ${Colors.lightGray};
  border-radius: 0.6rem;
  padding: 0.6rem 3.6rem;
  margin-top: 0.7rem;
  @media (min-width: ${ScreenWidths.phone + 1}px) and (max-width: ${ScreenWidths.tablet}px) {
    padding: 0.6rem 1.2rem;
  }
`;

const EntrantResult = styled.div`
  display: flex;
  flex-direction: row;
`;

const Entrants = styled.div`
  min-width: 14rem;

  p {
    font-size: 1.1rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
`;

const Rank = styled(FlexDiv)`
  margin-right: 0.8rem;
`;

const RaceResult = styled(FlexDiv)`
  margin-left: 1.8rem;
  @media (max-width: ${ScreenWidths.tablet}px) {
    margin-left: 0.3rem;
  }
`;

const ButtonsDiv = styled(FlexDiv)`
  flex-direction: column;
  margin: 0 0.6rem;
`;

const RacetimeButtonStyled = styled(RacetimeButton)`
  margin-top: 0.5rem;
  width: 100%;
`;

const TwitchButtonStyled = styled(TwitchButton)`
  width: 100%;
`;
