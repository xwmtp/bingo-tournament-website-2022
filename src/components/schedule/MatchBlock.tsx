import React from "react";
import styled from "styled-components";
import {
  isScheduled,
  ScheduledMatch,
  UnscheduledMatch,
} from "../../domain/Match";
import { DateTime } from "luxon";
import { UrlButton } from "../forms/UrlButton";
import { MdOutlineLiveTv } from "react-icons/md";
import { IoLogoTwitch } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";
import { DesktopOnlyFlexDiv, FlexDiv } from "../divs/FlexDiv";
import { Colors } from "../../GlobalStyle";
import { EntrantDisplay } from "../EntrantDisplay";
import { Button } from "../forms/Button";

interface Props {
  match: UnscheduledMatch | ScheduledMatch;
}

export const MatchBlock: React.FC<Props> = ({ match }) => {
  return (
    <MatchBlockContainer>
      <StartTimeContainer>
        {isScheduled(match) ? (
          <StartTime>
            <p>{match.startTime.toLocaleString(DateTime.TIME_SIMPLE)}</p>
          </StartTime>
        ) : (
          <FlexDiv>
            <Button color={"coral"}>
              <FlexDiv>
                <BiCalendar size={18} />
              </FlexDiv>
              <ButtonText>Pick time</ButtonText>
            </Button>
          </FlexDiv>
        )}
      </StartTimeContainer>

      <Entrants>
        <EntrantDisplay entrant={match.entrant1} />
        <EntrantDisplay entrant={match.entrant2} />
      </Entrants>
      <Round>
        <p>{match.round}</p>
      </Round>
      <ButtonsDiv>
        <UrlButton
          color={"twitchPurple"}
          url={
            match.restreamChannel &&
            "https://www.twitch.tv/" + match.restreamChannel
          }
        >
          <FlexDiv>
            <IoLogoTwitch size={18} />
          </FlexDiv>
          <ButtonText>Restream</ButtonText>
        </UrlButton>
        <ButtonMarginTop>
          <UrlButton
            color={"brightMossGreen"}
            url={`https://kadgar.net/live/${match.entrant1.twitchChannel}/${match.entrant2.twitchChannel}`}
          >
            <FlexDiv>
              <MdOutlineLiveTv size={17} />
            </FlexDiv>
            <ButtonText>Kadgar</ButtonText>
          </UrlButton>
        </ButtonMarginTop>
      </ButtonsDiv>
    </MatchBlockContainer>
  );
};

const MatchBlockContainer = styled(FlexDiv)`
  justify-content: space-around;
  background-color: ${Colors.lightGray};
  border-radius: 10px;
  padding: 10px 0;
  margin-top: 12px;
`;

const Entrants = styled.div`
  min-width: 14rem;

  p {
    font-size: 1.1rem;
    margin: 5px 0;
  }
`;

const StartTime = styled(FlexDiv)`
  font-size: 1.4rem;
  font-weight: 600;
`;

const StartTimeContainer = styled(FlexDiv)`
  min-width: 7.5rem;
`;

const Round = styled(DesktopOnlyFlexDiv)`
  min-width: 120px;
`;

const ButtonsDiv = styled(FlexDiv)`
  flex-direction: column;
  margin: 0 10px;
`;

const ButtonMarginTop = styled.div`
  margin-top: 8px;
  width: 100%;
`;

const ButtonText = styled(DesktopOnlyFlexDiv)`
  margin-left: 5px;
`;
