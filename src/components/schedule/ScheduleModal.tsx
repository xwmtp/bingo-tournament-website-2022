import Modal from "styled-react-modal";
import { Colors } from "../../GlobalStyle";
import React, { useState } from "react";
import { Container } from "../Container";
import styled from "styled-components";
import { DateTime } from "luxon";
import { FlexDiv } from "../divs/FlexDiv";
import { Button } from "../forms/Button";
import { DateTimeInput } from "../forms/DateTimeInput";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<Props> = ({ visible, onClose }) => {
  const [dateTimeInput, setDateTimeInput] = useState<DateTime>(DateTime.local());

  return (
    <ModalStyled isOpen={visible} onBackgroundClick={onClose} onEscapeKeydown={onClose}>
      <ContainerStyled title={"Pick date & time"} size="small" width={"700px"}>
        <ContainerContents>
          <p>
            {`Please schedule your match after agreeing on a time with your
            opponent. Your detected timezone is ${DateTime.local().toFormat(
              "ZZZZ"
            )} (${DateTime.local().toFormat("ZZZZZ")}).`}
          </p>

          <DateTimeInput dateTime={dateTimeInput} setDateTime={setDateTimeInput} />

          <p>Schedule match for:</p>
          <h4>{dateTimeInput.toLocaleString(DateTime.DATETIME_FULL)}</h4>
          <ConfirmButton color={"brightMossGreen"} size={"big"}>
            Confirm
          </ConfirmButton>
        </ContainerContents>
      </ContainerStyled>
    </ModalStyled>
  );
};

const ModalStyled = Modal.styled`
  position: absolute;
  top: 20%;
  border-radius: 0.6rem;
  padding: 1.2rem;
  background-color: ${Colors.darkGrey};
`;

const ContainerStyled = styled(Container)`
  margin-bottom: 0;
  max-width: 85vw;
`;

const ContainerContents = styled(FlexDiv)`
  display: flex;
  flex-direction: column;
`;

const ConfirmButton = styled(Button)`
  margin-top: 1.2rem;
`;
