import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import { Journey } from '../models/trainInfo';

function toHourMins(duration: number): string {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return String(hours) + 'h' + String(minutes) + 'm';
}
const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8a9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    borderColor: '#83af9b',
  },
  journeyBriefInfo: {
    backgroundColor: '#fc9d9a',
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    //paddingLeft: 0,
  },
  overviewLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewText: {
    fontSize: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },
  journeyInfoText: {
    paddingBottom: 8,
    //paddingTop: 10,
    fontSize: 12,
  },
  ticketInfo: {
    backgroundColor: '#fc9d9a',
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
  },
  ticketInfoBox: {
    backgroundColor: '#fc9d9a',
    marginBottom: 2,
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ticketDescription: {
    flex: 4,
    alignSelf: 'center',
    fontSize: 14,
  },
  ticketPrice: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  legInfo: {
    backgroundColor: '#fc9d9a',
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  overview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#83af9b',
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
    marginTop: 20,
  },
  locationAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    width: 250,
  },
  locationText: {
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  timeText: {
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  arrowTimeMode: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    width: 250,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 3,
    marginTop: 3,
    borderBottomColor: '#83af9b',
    borderTopColor: '#83af9b',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  arrow: {
    flex: 1,
    width: 10,
    height: 60,
  },
  arrowText: {
    flex: 10,
  },
  arrowTextLeft: {
    flex: 10,
    textAlign: 'right',
    paddingRight: 5,
  },
  arrowTextRight: {
    flex: 10,
    textAlign: 'left',
    paddingLeft: 5,
  },
});

type DetailScreenProps = ScreenNavigationProps<'Details'>;

const DetailsScreen: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const [journey, setJourney] = React.useState<Journey>(route.params.journey);
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <View style={styles.overviewLineContainer}>
          <Text style={styles.overviewText}>{journey.originStation.crs}</Text>
          <Text style={styles.overviewText}> &#10142; </Text>
          <Text style={styles.overviewText}>
            {journey.destinationStation.crs}
          </Text>
        </View>
        <View style={styles.overviewLineContainer}>
          <Text style={styles.overviewText}>
            {new Date(journey.departureTime).toLocaleTimeString('en-GB', {
              timeStyle: 'short',
            })}
          </Text>
          <Text> {toHourMins(journey.journeyDurationInMinutes)} </Text>
          <Text style={styles.overviewText}>
            {new Date(journey.arrivalTime).toLocaleTimeString('en-GB', {
              timeStyle: 'short',
            })}
          </Text>
        </View>
      </View>

      <View style={styles.ticketInfo}>
        {journey.tickets.map((ticket) => {
          return (
            <View key={ticket.name} style={styles.ticketInfoBox}>
              <Text style={styles.ticketDescription}> {ticket.name} </Text>
              <Text style={styles.ticketPrice}>
                {' '}
                {currencyFormatter.format(ticket.priceInPennies / 100)}{' '}
              </Text>
            </View>
          );
        })}
      </View>

      <FlatList
        data={journey.legs}
        renderItem={({ item }) => {
          if (item.mode == 'TRAIN') {
            return (
              <View style={styles.legInfo} key={item.origin.crs}>
                <View style={styles.locationAndTime}>
                  <Text style={styles.locationText}>
                    {' '}
                    {item.origin.displayName}{' '}
                  </Text>
                  <Text style={styles.timeText}>
                    {new Date(item.departureDateTime).toLocaleTimeString(
                      'en-GB',
                      {
                        timeStyle: 'short',
                      },
                    )}
                  </Text>
                </View>
                <View style={styles.arrowTimeMode}>
                  <Text style={styles.arrowTextLeft}>
                    {item.trainOperator.code}
                  </Text>
                  <Divider />
                  <Image
                    source={require('./arrow.png')}
                    style={styles.arrow}
                    resizeMode="cover"
                  />
                  <Divider />
                  <Text style={styles.arrowTextRight}>
                    {toHourMins(item.durationInMinutes)}
                  </Text>
                </View>

                <View style={styles.locationAndTime}>
                  <Text style={styles.locationText}>
                    {' '}
                    {item.destination.displayName}{' '}
                  </Text>
                  <Text style={styles.timeText}>
                    {new Date(item.arrivalDateTime).toLocaleTimeString('en-GB', {
                      timeStyle: 'short',
                    })}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.legInfo} key={item.origin.crs}>
                <View style={styles.locationAndTime}>
                  <Text style={styles.locationText}>
                    {' '}
                    {item.origin.displayName}{' '}
                  </Text>
                </View>
                <View style={styles.arrowTimeMode}>
                  <Text style={styles.arrowTextLeft}>{item.mode}</Text>
                  <Divider />
                  <Image
                    source={require('./arrow.png')}
                    style={styles.arrow}
                    resizeMode="cover"
                  />
                  <Divider />
                  <Text style={styles.arrowTextRight}>
                    {toHourMins(item.durationInMinutes)}
                  </Text>
                </View>
                <View style={styles.locationAndTime}>
                  <Text style={styles.locationText}>
                    {' '}
                    {item.destination.displayName}{' '}
                  </Text>
                </View>
              </View>
            );
          } //end of else
        }}
      ></FlatList>
    </View>
  );
};

export default DetailsScreen;
