import styled from 'styled-components';

export default function Bait({ filteredCards }) {
  const findBaits = filteredCards.map(card =>
    card.catches.map(data => data.bait)
  );
  const baits = findBaits.flat();

  const count = {};

  baits.forEach(item => {
    if (count[item]) {
      count[item]++;
    } else {
      count[item] = 1;
    }
  });

  // Schritt 1: Kombinieren von Bait + Count
  const baitList = Object.entries(count).map(([bait, value]) => ({
    bait,
    count: value,
  }));

  // Schritt 2: Sortieren nach count DESC
  const sortedBaits = baitList.sort((a, b) => b.count - a.count);

  return (
    <BaitContainer>
      <Baits>
        {sortedBaits.map((item, index) => (
          <div key={index}>{item.bait || 'no name'}</div>
        ))}
      </Baits>
      <Catches>
        {sortedBaits.map((item, index) => (
          <div key={index}>{item.count}</div>
        ))}
      </Catches>
    </BaitContainer>
  );
}

const BaitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-radius: 10px;
  margin-top: 10px;
  position: relative;
`;

const Baits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Catches = styled.div`
  display: flex;
  flex-direction: column;
  color: #687a48;
  gap: 5px;
  text-align: right;
`;
