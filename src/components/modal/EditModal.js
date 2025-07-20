import { useState } from 'react';
import Button from '../Button';
import styled from 'styled-components';
import AddCatchPopup from './AddCatchPopup';
import EditCatchPopup from './EditCatchModal';
import { IoIosArrowDown } from 'react-icons/io';
import { BiTargetLock } from 'react-icons/bi';
import { MdWater } from 'react-icons/md';
import { IoFishOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import moment from 'moment';

export default function EditModal({
  dataforEdit,
  toggleEditing,
  handleEdit,
  profile,
  profileCards,
}) {
  const [editData, setEditData] = useState(dataforEdit);
  const [showAddCatch, setShowAddCatch] = useState(false);
  const [showEditCatch, setShowEditCatch] = useState(false);
  const [selectedCatch, setSelectedCatch] = useState(null);

  async function handleAddCatch(values) {
    const previousCatches = dataforEdit.catches ?? [];
    setEditData({
      ...dataforEdit,
      catches: [...previousCatches, values],
    });
    setEditData({
      ...dataforEdit,
      catches: [...(editData.catches || []), values],
    });
    setShowAddCatch(prevState => !prevState);
  }

  async function handleEditCatch(editCatchData) {
    setEditData(prevData => {
      const updatedCatches = prevData.catches.map(catchItem =>
        catchItem._id === editCatchData._id ? { ...editCatchData } : catchItem
      );

      return {
        ...prevData,
        catches: updatedCatches,
      };
    });

    setShowEditCatch(false);
    setSelectedCatch(null);
  }

  async function handleDeleteCatch(_id) {
    const filteredCatches = editData.catches.filter(fish => fish._id !== _id);
    setEditData(prevState => ({
      ...prevState,
      catches: filteredCatches,
    }));
    setShowEditCatch(false);
    setSelectedCatch(null);
  }

  const toggleShowAddCatch = () => {
    setShowAddCatch(prevState => !prevState);
  };

  const toggleShowEditCatch = () => {
    setShowEditCatch(prevState => !prevState);
  };

  return (
    <Card>
      <Preview onClick={toggleEditing}>
        <Year>{editData.date.slice(0, 4)}</Year>
        <Date>
          <div>{editData.date.slice(8, 10)}</div>
          <span>{editData.date.slice(5, 7)}</span>
        </Date>
        <Infos>
          <Together>
            <MdWater size={20} color={'#687a48'} />
            {editData.water}
          </Together>
          <Together>
            <BiTargetLock size={20} color={'#687a48'} />
            {editData.target}
          </Together>
          <InSameRow>
            <span>
              <IoFishOutline color={'#687a48'} />
              {editData.catches ? editData.catches.length : '0'}
            </span>
            <IoIosArrowDown onClick={toggleEditing} color="#FF9C27" />
          </InSameRow>
        </Infos>
      </Preview>
      <Details>
        <PartTitle>General infos:</PartTitle>
        <Fieldset>
          <Data>
            <Term>date:</Term>
            <Input
              type="date"
              value={editData.date}
              onChange={e => setEditData({ ...editData, date: e.target.value })}
              required
              max={moment().format('YYYY-MM-DD')}
            />
          </Data>
          <Data>
            <Term>water:</Term>
            <Input
              type="text"
              value={editData.water}
              onChange={e =>
                setEditData({ ...editData, water: e.target.value })
              }
              required
              maxLength={25}
            />
          </Data>
          <Data>
            <Term>target:</Term>
            <Input
              type="text"
              value={editData.target}
              onChange={e =>
                setEditData({ ...editData, target: e.target.value })
              }
              required
              maxLength={25}
            />
          </Data>
        </Fieldset>
        <PartTitle>Water data:</PartTitle>
        <Fieldset>
          <Data>
            <Term>stretch:</Term>
            <Input
              type="text"
              value={editData.stretch}
              onChange={e =>
                setEditData({ ...editData, stretch: e.target.value })
              }
              maxLength={25}
            />
          </Data>
          <Data>
            <Term>water temperature:</Term>
            <Wrapper>
              <Input
                type="number"
                value={editData.watertemp}
                onChange={e =>
                  setEditData({ ...editData, watertemp: e.target.value })
                }
                min={-5}
                max={50}
              />
              <span>°C</span>
            </Wrapper>
          </Data>
          <Data>
            <Term>water color:</Term>
            <Select
              value={editData.watercolor}
              onChange={e =>
                setEditData({ ...editData, watercolor: e.target.value })
              }
            >
              <option value="">select</option>
              <option value="cloudy">cloudy</option>
              <option value="slightly cloudy">slightly cloudy</option>
              <option value="clear">clear</option>
            </Select>
          </Data>
          <Data>
            <Term>water level:</Term>
            <Select
              value={editData.waterlevel}
              onChange={e =>
                setEditData({ ...editData, waterlevel: e.target.value })
              }
            >
              <option value="">select</option>
              <option value="low">low</option>
              <option value="normal">normal</option>
              <option value="high">high</option>
            </Select>
          </Data>
        </Fieldset>
        <PartTitle>Weather data:</PartTitle>
        <Fieldset>
          <Data>
            <Term>weather:</Term>
            <Select
              value={editData.weather}
              onChange={e =>
                setEditData({ ...editData, weather: e.target.value })
              }
            >
              <option value="">select</option>
              <option value="sunny">sunny</option>
              <option value="cloudy">cloudy</option>
              <option value="rainy">rainy</option>
              <option value="stormy">stormy</option>
              <option value="foggy">foggy</option>
              <option value="snow">snow</option>
            </Select>
          </Data>
          <Data>
            <Term>air pressure:</Term>
            <Wrapper>
              <Input
                value={editData.airpressure}
                onChange={e =>
                  setEditData({ ...editData, airpressure: e.target.value })
                }
                type="number"
                min={850}
                max={1150}
              />
              <span>hPa</span>
            </Wrapper>
          </Data>
          <Data>
            <Term>temperature:</Term>
            <Wrapper>
              <Input
                value={editData.temperature}
                onChange={e =>
                  setEditData({ ...editData, temperature: e.target.value })
                }
                type="number"
                min={-50}
                max={50}
              />
              <span>°C</span>
            </Wrapper>
          </Data>
          <Data>
            <Term>moon:</Term>
            <Select
              value={editData.moon}
              onChange={e => setEditData({ ...editData, moon: e.target.value })}
            >
              <option value="">select</option>
              <option value="full moon">full moon</option>
              <option value="increasing moon">increasing moon</option>
              <option value="waning moon">waning moon</option>
              <option value="new moon">new moon</option>
              <option value="snow">snow</option>
            </Select>
          </Data>
          <Data>
            <Term>wind:</Term>
            <Select
              value={editData.wind}
              onChange={e => setEditData({ ...editData, wind: e.target.value })}
            >
              <option value="east">east</option>
              <option value="southeast">south east</option>
              <option value="south">south</option>
              <option value="southwest">south west</option>
              <option value="west">west</option>
              <option value="northwest">north west</option>
              <option value="north">north</option>
              <option value="northeast">north east</option>
            </Select>
          </Data>
          <Data>
            <Term>wind speed:</Term>
            <Wrapper>
              <Input
                value={editData.windspeed}
                onChange={e =>
                  setEditData({ ...editData, windspeed: e.target.value })
                }
                type="number"
                min={0}
              />
              <span>km/h</span>
            </Wrapper>
          </Data>
        </Fieldset>
        <PartTitle>
          Catchbook:
          <AddCatch onClick={toggleShowAddCatch}>
            <AiOutlinePlusCircle color="#FF9C27" />
            add catch
          </AddCatch>
        </PartTitle>
        {editData.catches && editData.catches.length > 0 ? (
          <>
            <CatchList>
              {editData.catches.map((data, index) => (
                <Catches
                  key={index}
                  onClick={() => {
                    setSelectedCatch(data);
                    toggleShowEditCatch();
                  }}
                >
                  <span>{index + 1}.</span>
                  <span>{data.species}</span>
                  <span>{data.length} cm</span>
                </Catches>
              ))}
              {showEditCatch && (
                <EditCatchPopup
                  selectedCatch={selectedCatch}
                  closeEditCatchPopup={toggleShowEditCatch}
                  profileCards={profileCards}
                  profile={profile}
                  handleEditCatch={handleEditCatch}
                  handleDeleteCatch={handleDeleteCatch}
                />
              )}
            </CatchList>
          </>
        ) : (
          <p>no catches yet, add some</p>
        )}
        {showAddCatch && (
          <AddCatchPopup
            profile={profile}
            profileCards={profileCards}
            handleAddCatch={handleAddCatch}
            closeAddCatchPopup={toggleShowAddCatch}
          />
        )}
        <PartTitle>Summary:</PartTitle>
        <Fieldset>
          <Data>
            <Term>total bites:</Term>
            <Input
              value={editData.bites}
              onChange={e =>
                setEditData({ ...editData, bites: e.target.value })
              }
              type="number"
              min={0}
            />
          </Data>
          <Data>
            <Term>lost fish:</Term>
            <Input
              value={editData.lost}
              onChange={e => setEditData({ ...editData, lost: e.target.value })}
              type="number"
              min={0}
            />
          </Data>
        </Fieldset>
      </Details>
      <Submit>
        <Button
          text="Save changes"
          onClick={() => {
            handleEdit(editData);
            toggleEditing();
          }}
        />
        <Button text="Cancel" isAccent={true} onClick={toggleEditing} />
      </Submit>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; // wichtig für volle Höhe
`;

const Preview = styled.div`
  display: flex;
  position: relative;
  padding: 15px;
  flex-shrink: 0;
  border: 0.5px solid #a2c36c;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
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
  right: 15px;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: 8px;
    color: #687a48;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
`;

const Section = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 0.5px solid #a2c36c;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const PartTitle = styled.h3`
  font-size: 1rem;
  padding: 0;
  padding-bottom: 2px;
  margin: 0;
  margin-bottom: 5px;
  width: 100%;
  color: #687a48;
  border-bottom: 2px dotted #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CatchesTitle = styled.h3`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  width: 100%;
  color: #687a48;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9rem;
`;

const Term = styled.div`
  font-size: 1rem;
  color: #a2c36c;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ff9c27;
  padding: 2px 5px;
  border-radius: 5px;
  color: #aaa;
  background-color: white;
  height: 25px;
  font-size: 0.9rem;
`;

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0;
  border: none;
  position: relative;
  font-size: 1rem;
  margin: 5px 0 10px 0;
`;

const AddCatch = styled.div`
  color: #ff9c27;
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 0.8rem;
`;

const CatchList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin: 5px 0 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Catches = styled.li`
  border: 0.5px solid #a2c36c;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  background-color: white;

  span {
    font-size: 0.8rem;
    color: #687a48;
    margin: 0;
    font-weight: bold;
  }
`;

const Submit = styled.div`
  flex-shrink: 0;
  background-color: #fffcf8;
  padding: 20px 10px 10px 10px;
  border-top: 0.5px solid #a2c36c;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px -10px 20px -10px rgba(0, 0, 0, 0.25);
`;
