import styled from 'styled-components';
import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { BiTargetLock } from 'react-icons/bi';
import { MdWater } from 'react-icons/md';
import { IoFishOutline } from 'react-icons/io5';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Button from '../Button';
import DeleteModal from '../modal/DeleteModal';
import EditModal from '../modal/EditModal';

export default function Cards({
  data,
  onDelete,
  showModal,
  confirmDelete,
  cancelDelete,
  handleEdit,
  profile,
  profileCards,
}) {
  const [showDetails, setshowDetails] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [cardBeingEdited, setCardBeingEdited] = useState(null);

  function toggleShowDetails() {
    setshowDetails(!showDetails);
  }

  function toggleEditing(card) {
    setCardBeingEdited(card);
    setIsEditing(prevState => !prevState);
  }

  return (
    <>
      <Card>
        <Preview onClick={toggleShowDetails}>
          <Year>{data.date.slice(0, 4)}</Year>
          <Date>
            <div>{data.date.slice(8, 10)}</div>
            <span>{data.date.slice(5, 7)}</span>
          </Date>
          <Infos>
            <Together>
              <MdWater size={20} color={'#687a48'} />
              {data.water}
            </Together>
            <Together>
              <BiTargetLock size={20} color={'#687a48'} />
              {data.target}
            </Together>
            <InSameRow>
              <span>
                <IoFishOutline color={'#687a48'} />
                {data.catches ? data.catches.length : '0'}
              </span>
              {showDetails && (
                <IoIosArrowForward
                  onClick={toggleShowDetails}
                  color="#FF9C27"
                />
              )}
              {!showDetails && (
                <IoIosArrowDown onClick={toggleShowDetails} color="#FF9C27" />
              )}
            </InSameRow>
          </Infos>
        </Preview>
        {!showDetails && !isEditing && (
          <div>
            <Content>
              <Part>
                <PartTitle>Water</PartTitle>
                <Data>
                  <Term>water:</Term>
                  <Value>{data.water}</Value>
                </Data>
                {data.stretch && (
                  <Data>
                    <Term>stretch:</Term>
                    <Value>{data.stretch}</Value>
                  </Data>
                )}
                {data.watertemp && (
                  <Data>
                    <Term>water temperature:</Term>
                    <Value>{data.watertemp}</Value>
                  </Data>
                )}
                {data.watercolor && (
                  <Data>
                    <Term>water color:</Term>
                    <Value>{data.watercolor}</Value>
                  </Data>
                )}
                {data.waterlevel && (
                  <Data>
                    <Term>water level:</Term>
                    <Value>{data.waterlevel}</Value>
                  </Data>
                )}
              </Part>
              <Part>
                <PartTitle>Weather</PartTitle>
                {data.weather && (
                  <Data>
                    <Term>weather:</Term>
                    <Value>{data.weather}</Value>
                  </Data>
                )}
                {data.airpressure && (
                  <Data>
                    <Term>air pressure:</Term>
                    <Value>{data.airpressure} hPa</Value>
                  </Data>
                )}
                {data.temperature && (
                  <Data>
                    <Term>temperature:</Term>
                    <Value>{data.temperature} °C</Value>
                  </Data>
                )}
                {data.moon && (
                  <Data>
                    <Term>moon:</Term>
                    <Value>{data.moon}</Value>
                  </Data>
                )}
                {data.wind && (
                  <Data>
                    <Term>wind:</Term>
                    <Value>{data.wind}</Value>
                  </Data>
                )}
                {data.windspeed !== null &&
                  data.windspeed !== undefined &&
                  data.windspeed !== '' && (
                    <Data>
                      <Term>wind speed:</Term>
                      <Value>{data.windspeed} km/h</Value>
                    </Data>
                  )}
              </Part>
              <Part>
                {data.catches && data.catches.length > 0 && (
                  <PartTitle>
                    {data.catches.length}
                    {data.catches.length === 1 ? ' Catch:' : ' Catches:'}
                  </PartTitle>
                )}
                <Catches>
                  {data.catches && data.catches.length > 0 ? (
                    <>
                      {data.catches.map((item, index) => (
                        <CatchPart key={index}>
                          {item.species && (
                            <Wrapper>
                              <CatchTitle>
                                {index + 1}. {item.species}
                                <Term>{' - ' + item.length + ' cm:'}</Term>
                              </CatchTitle>
                              <Taken>
                                {item.taken === true ? 'taken' : 'released'}
                              </Taken>
                            </Wrapper>
                          )}
                          {item.time && (
                            <Data>
                              <CatchTerm>time:</CatchTerm>
                              <CatchValue>{item.time}</CatchValue>
                            </Data>
                          )}
                          {(item.weight === 0 || item.weight) && (
                            <Data>
                              <CatchTerm>weight:</CatchTerm>
                              <CatchValue>{item.weight} kg</CatchValue>
                            </Data>
                          )}
                          {item.bait && (
                            <Data>
                              <CatchTerm>bait:</CatchTerm>
                              <CatchValue>{item.bait}</CatchValue>
                            </Data>
                          )}
                          {item.location && (
                            <Data>
                              <CatchTerm>location:</CatchTerm>
                              <CatchValue>{item.location}</CatchValue>
                            </Data>
                          )}
                          {item.notes && (
                            <Data>
                              <CatchTerm>notes:</CatchTerm>
                              <CatchValue>{item.notes}</CatchValue>
                            </Data>
                          )}
                        </CatchPart>
                      ))}
                    </>
                  ) : (
                    <PartTitle>No fish caught</PartTitle>
                  )}
                </Catches>
              </Part>
              <Part>
                <Data>
                  <Term>total bites:</Term>
                  <Value>{data.bites ? data.bites : '0'}</Value>
                </Data>
                <Data>
                  <Term>lost fish:</Term>
                  <Value>{data.lost ? data.lost : '0'}</Value>
                </Data>
                <Options>
                  <AiOutlineEdit
                    size={25}
                    color="687a48"
                    onClick={() => toggleEditing(data)}
                  />
                  <AiOutlineDelete
                    size={25}
                    color="ff9c27"
                    onClick={() => onDelete(data._id)}
                  />
                </Options>
              </Part>
            </Content>
          </div>
        )}
        {isEditing && (
          <Overlay>
            <Container>
              <EditModal
                dataforEdit={data}
                toggleEditing={toggleEditing}
                handleEdit={handleEdit}
                profile={profile}
                profileCards={profileCards}
                card={cardBeingEdited}
              />
            </Container>
          </Overlay>
        )}
        {showModal && (
          <ModalWrapper>
            <DeleteModal
              text="card"
              confirmDelete={confirmDelete}
              cancelDelete={cancelDelete}
            />
          </ModalWrapper>
        )}
      </Card>
    </>
  );
}

const Card = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fffcf8;
  color: #a2c36c;
  border: 0.5px solid #a2c36c;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
`;

const Preview = styled.div`
  display: flex;
  position: relative;
  padding: 10px;
  border-bottom: 0.5px solid #a2c36c;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.25);
`;

const Date = styled.div`
  padding: 0 15px;
  padding-right: 25px;
  margin-right: 15px;
  border-right: 3px dotted #a2c36c;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    font-size: 32px;
    font-weight: bold;
    padding: 0;
    margin: 0;
    color: #687a48;
  }

  span {
    font-size: 20px;
    font-weight: lighter;
    padding: 0;
    margin: 0;
    color: #687a48;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`;

const Year = styled.span`
  color: #687a48;
  font-size: 16px;
  position: absolute;
  right: 10px;
`;

const Together = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InSameRow = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 1px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  margin: 10px 0 5px 0;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Catches = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 89vw;
  max-width: 100%;
`;

const CatchPart = styled.div`
  width: 300px;
  padding: 10px;
  border: 1px solid #a2c36c;
  border-radius: 8px;
  background-color: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const CatchTitle = styled.div`
  color: #ff9c27;
  font-weight: bold;
  font-size: 1rem;
`;

const PartTitle = styled.h3`
  font-size: 1.1rem;
  padding: 0;
  color: #687a48;
  border-bottom: 2px dotted #ddd;
  margin: 0;
  margin-bottom: 5px;
  width: 100%;
`;

const Data = styled.small`
  font-size: 0.9rem;
  display: flex;
`;

const Term = styled.span`
  font-weight: bold;
  color: #687a48;
  width: 45%;
`;

const Value = styled.div`
  font-size: 0.9rem;
  width: 55%;
`;

const CatchTerm = styled.span`
  font-weight: bold;
  color: #687a48;
  width: 27%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Taken = styled.span`
  color: #ddd;
  font-size: 0.7rem;
`;

const CatchValue = styled.div`
  font-size: 0.9rem;
  width: 73%;
`;

const Options = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const ModalWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  overflow: hidden;
`;

const Container = styled.div`
  font-size: 1rem;
  color: #a2c36c;
  box-shadow: rgba(0, 0, 0, 0.07) 0 1px 4px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  height: 95%;
  width: 100%;
  background-color: #fffcf8;
  border-radius: 20px 20px;

  /* Animation */
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0%);
    }
  }
`;
