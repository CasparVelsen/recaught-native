import CreatableSelect from 'react-select/creatable';

const germanFishSpecies = [
  'Aal',
  'Aland',
  'Äsche',
  'Bachforelle',
  'Bachsaibling',
  'Barbe',
  'Barsch',
  'Bitterling',
  'Brassen',
  'Döbel',
  'Elritze',
  'Flunder',
  'Gründling',
  'Güster',
  'Hecht',
  'Karausche',
  'Karpfen',
  'Kaulbarsch',
  'Lachs',
  'Laube (Ukelei)',
  'Maräne',
  'Meerforelle',
  'Nase',
  'Regenbogenforelle',
  'Rotauge',
  'Rotfeder',
  'Rutte (Quappe)',
  'Schleie',
  'Schmerle',
  'Schuppenkarpfen',
  'Seeforelle',
  'Seesaibling',
  'Spiegelkarpfen',
  'Stint',
  'Wels',
  'Weißfisch',
  'Zander',
  'Zope',
  // Meeresfische
  'Dorsch',
  'Hering',
  'Makrele',
  'Seelachs',
  'Scholle',
  'Steinbutt',
  'Seezunge',
  'Rotbarsch',
  'Hornhecht',
  'Wittling',
  'Leng',
  'Seehecht',
  'Butt',
  'Meeräsche',
  'Sardine',
  'Thunfisch',
  'Schwertfisch',
  'Seeaal',
];

const speciesOptions = germanFishSpecies.map(species => ({
  label: species,
  value: species,
}));

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: 25,
    minHeight: 25,
    borderRadius: 5,
    border: '1px solid #ff9c27',
    padding: '0 6px',
    backgroundColor: 'white',
    boxShadow: state.isFocused ? '0 0 0 1px #ff9c27' : 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'text',
  }),

  valueContainer: provided => ({
    ...provided,
    height: 25,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap', // Kein Umbruch
    overflow: 'hidden', // Text, der zu lang ist, wird abgeschnitten
  }),

  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    color: '#aaa',
    fontSize: '0.9rem',
    width: '1px', // Sehr schmal
    flexGrow: 1, // Nimmt den restlichen Platz, ohne umbruch
  }),

  placeholder: provided => ({
    ...provided,
    color: '#aaa',
    fontSize: '0.8rem',
    lineHeight: 'normal',
    margin: 0,
    padding: 0,
  }),

  singleValue: provided => ({
    ...provided,
    lineHeight: 'normal',
    fontSize: '0.9rem',
    color: '#aaa',
    margin: 0,
    padding: 0,
    whiteSpace: 'nowrap', // Kein Zeilenumbruch
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Wenn zu lang, mit "..." abschneiden
  }),

  indicatorsContainer: provided => ({
    ...provided,
    height: 25,
    display: 'flex',
    alignItems: 'center',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: provided => ({
    ...provided,
    padding: '0 2px',
    display: 'flex',
    alignItems: 'center',
    color: '#aaa',
    cursor: 'pointer',
    svg: {
      width: 14,
      height: 14,
    },
  }),

  clearIndicator: () => ({
    display: 'none',
  }),

  menu: provided => ({
    ...provided,
    zIndex: 9999,
    fontSize: '0.9rem',
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#eee' : 'white',
    color: '#a2c36c',
    cursor: 'pointer',
  }),
};

export default function SpeciesSelect({ value, onChange }) {
  const selectedOption =
    speciesOptions.find(opt => opt.value === value) || null;

  return (
    <CreatableSelect
      inputId="species"
      options={speciesOptions}
      value={selectedOption}
      onChange={option => {
        const selectedValue = option?.value || '';
        onChange(selectedValue);
      }}
      isClearable
      isSearchable
      placeholder=""
      styles={customSelectStyles}
    />
  );
}
