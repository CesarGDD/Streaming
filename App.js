import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Row from './components/Row';
import request from './request';
import { View, ScrollView, StyleSheet} from 'react-native';
import Banner from './components/Banner';

export default function App() {
  return (
    <View style={styled.container}>
      <ScrollView >
          <Banner />
        <Row title="Popular Movies" fetchUrl={request.fetchPupularMovies}/>
        <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
        <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
        <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
        <Row title="Others Movies" fetchUrl={request.fetchTrendig} />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );

}
    const styled = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: "#111",
      }
  })

