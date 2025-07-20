import styled from 'styled-components';
import WeatherStats from './WeatherStats';
import Species from './charts/catch/Species';
import Bait from './charts/catch/Bait';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IoShareSocialOutline } from 'react-icons/io5';
import ExportStatsModal from '../modal/ExportStatsModal';
import { useState } from 'react';

export default function Stats({ filteredCards, season, water }) {
  const [toggleExportModal, setToggleExportModal] = useState(false);

  const allSpecies = filteredCards.flatMap(card =>
    card.catches.map(entry => entry.species)
  );

  const count = {};
  allSpecies.forEach(item => {
    count[item] = (count[item] || 0) + 1;
  });

  const speciesList = Object.entries(count).map(([species, count]) => ({
    species,
    count,
  }));

  const sortedSpecies = speciesList.sort((a, b) => b.count - a.count);

  const lengths = filteredCards.flatMap(card =>
    card.catches.map(entry => parseInt(entry.length))
  );

  const average =
    lengths.reduce((sum, val) => sum + val, 0) / (lengths.length || 1);

  const roundedAverage =
    Math.round((average + Number.EPSILON) * 100) / 100 || 0;

  const takenFishCount = filteredCards
    .flatMap(entry => entry.catches || [])
    .filter(catchItem => catchItem.taken === true).length;

  const exportToExcel = () => {
    const flatData = filteredCards.flatMap(entry =>
      entry.catches.map(catchItem => ({
        Date: entry.date,
        Water: entry.water,
        Stretch: entry.stretch,
        Target: entry.target,
        Watertemp: entry.watertemp,
        Waterlevel: entry.waterlevel,
        Watercolor: entry.watercolor || '',
        Species: catchItem.species,
        Time: catchItem.time,
        Length: catchItem.length,
        Weight: catchItem.weight,
        Bait: catchItem.bait,
        Location: catchItem.location,
        Notes: catchItem.notes,
        Taken: catchItem.taken ? '1' : '',
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fänge');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'fangliste.xlsx');
  };

  const generateWhatsAppText = () => {
    const time = season;
    const river = water;
    const sessions = filteredCards.length;
    const allCatches = filteredCards.flatMap(entry => entry.catches || []);
    const fishCount = allCatches.length;
    const catchLines = filteredCards
      .flatMap(card =>
        card.catches.map(entry => ({
          species: entry.species,
          length: entry.length,
          line: `- ${entry.species}: ${entry.length} cm`,
        }))
      )
      .sort((a, b) => {
        const speciesCompare = a.species.localeCompare(b.species);
        if (speciesCompare !== 0) return speciesCompare;
        return b.length - a.length; // längste Fische zuerst
      })
      .map(entry => entry.line);

    const message = `My Catchlist${time ? ` ${time}` : ''}${
      river ? ` - ${river}` : ''
    }:

I was out fishing ${sessions} times and caught ${fishCount} fish in total:

${catchLines.join('\n')}

I took ${takenFishCount} fish home.
    
Tight lines!`;

    return message;
  };

  const exportToWhatsApp = () => {
    const text = generateWhatsAppText();
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <Period>
        <StatsTitle>
          Catchbook
          <IoShareSocialOutline
            size={25}
            color="#FF9C27"
            onClick={() => setToggleExportModal(prevState => !prevState)}
          />
        </StatsTitle>
        <WrapCatchList>
          <Component>
            <CatchList>
              <Numbers>
                {sortedSpecies.map((item, index) => (
                  <span key={index}>{item.count}x</span>
                ))}
              </Numbers>
              <Catches>
                {sortedSpecies.map((item, index) => (
                  <span key={index}>{item.species}</span>
                ))}
              </Catches>
            </CatchList>
            <div>
              <Average>
                <span>Taken:</span>
                {takenFishCount ? takenFishCount : ' 0'} fish
              </Average>
              <Average>
                <span>Ø size:</span>
                {roundedAverage ? roundedAverage : ' 0'} cm
              </Average>
            </div>
          </Component>
          <Species sortedSpecies={sortedSpecies} />
        </WrapCatchList>
      </Period>
      {toggleExportModal && (
        <ExportStatsModal
          handleCloseExportModal={() =>
            setToggleExportModal(prevState => !prevState)
          }
          exportToExcel={exportToExcel}
          exportToWhatsApp={exportToWhatsApp}
        />
      )}

      <Period>
        <WeatherStats filteredCards={filteredCards} />
      </Period>
      <Period>
        <Wrapper>
          <StatsTitle>Flybox</StatsTitle>
          <Hint>Catches</Hint>
        </Wrapper>
        <Scrollable>
          <Bait filteredCards={filteredCards} />
        </Scrollable>
      </Period>
    </div>
  );
}

const Period = styled.div`
  background-color: #fffcf8;
  border-radius: 10px;
  padding: 10px 10px 20px 10px;
  border: 0.5px solid #a2c36c;
  color: #a2c36c;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  margin: 15px 0 15px 0;
`;

const Scrollable = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const StatsTitle = styled.div`
  color: #687a48;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const CatchList = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0 10px;
`;

const Component = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Catches = styled.div`
  display: flex;
  flex-direction: column;
`;

const Numbers = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #687a48;
  }
`;

const Average = styled.div`
  display: flex;
  font-size: 1rem;
  gap: 5px;
  margin-top: 5px;

  span {
    color: #687a48;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const WrapCatchList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Hint = styled.div`
  color: #687a48;
  font-weight: bold;
  font-size: 0.8rem;
`;
