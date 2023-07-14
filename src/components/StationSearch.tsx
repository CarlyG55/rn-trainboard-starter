import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import stationJson from '../data/stations.json';
import { Station } from '../models/trainInfo';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
    alignContent: 'center',
    width: '95%',
  },
  item: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

type StationSearchProps = {
  title: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
};

const StationSearch: React.FC<StationSearchProps> = ({ title, setTarget }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [stations, setStations] = React.useState<Station[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const onChangeSearch = (query: string) => {
    let possibleStations = stationJson.stations.filter((station) =>
      station.name.toLowerCase().startsWith(query.toLocaleLowerCase()),
    );
    possibleStations = possibleStations.slice(
      0,
      Math.min(possibleStations.length, 5),
    );
    if (query === '') {
      possibleStations = [];
    }
    setSearchQuery(query);
    setStations(possibleStations);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={title}
        onChangeText={onChangeSearch}
        value={searchQuery}
        onFocus={() => setIsSearching(true)}
      ></Searchbar>
      {isSearching && searchQuery.length > 0 && (
        <List.Section style={{ width: 200 }}>
          {stations.map((station) => {
            return (
              <List.Item
                title={station.name}
                key={station.crs}
                titleStyle={styles.item}
                onPress={() => {
                  setSearchQuery(station.name);
                  setIsSearching(false);
                  setTarget(station.crs);
                }}
              />
            );
          })}
          {stations.length == 0 && (
            <List.Item
              titleStyle={styles.item}
              title="No stations found"
              key="NoStations"
            />
          )}
        </List.Section>
      )}
    </View>
  );
};

export default StationSearch;
