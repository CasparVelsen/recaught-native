import styled from 'styled-components';
import {
  AiOutlineMinusCircle,
  AiOutlineFileExcel,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { createPortal } from 'react-dom';

export default function ExportStatsModal({
  handleCloseExportModal,
  exportToExcel,
  exportToWhatsApp,
}) {
  return createPortal(
    <Overlay onClick={handleCloseExportModal}>
      <Container onClick={e => e.stopPropagation()}>
        <Title>
          Export
          <Closer onClick={handleCloseExportModal}>
            <CloseButton>close</CloseButton>
            <AiOutlineMinusCircle color="#FF9C27" />
          </Closer>
        </Title>
        <ExportButton onClick={exportToWhatsApp}>
          <AiOutlineWhatsApp size={25} />
          share catchbook
        </ExportButton>
        <ExportButton onClick={exportToExcel}>
          <AiOutlineFileExcel size={25} />
          export catchstatistik
        </ExportButton>
      </Container>
    </Overlay>,
    document.body
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Overlay muss hinter dem Popup liegen */
`;

const Container = styled.div`
  background-color: #fffcf8;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #687a48;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Zentriert den Container */
  width: 80%; /* Oder jede gewünschte Breite */
  max-width: 600px; /* Optional: Maximale Breite für größere Bildschirme */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Damit der Container vor allem anderen liegt */
  display: flex;
  flex-direction: column;
`;

const Closer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ff9c27;
  font-size: 0.9rem;
`;

const Title = styled.div`
  color: #687a48;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: #ff9c27;
  padding: 0;
`;

const ExportButton = styled.span`
  font-size: 1rem;
  color: #a2c36c;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;
