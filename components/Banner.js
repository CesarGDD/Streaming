import React, { useEffect, useState } from 'react';
import {StyleSheet, ImageBackground } from 'react-native';
import requests from '../request';
import axios from '../axios';
import styled from 'styled-components';
import {LinearGradient} from 'expo-linear-gradient';
import ResultsImage from './ResultsImage';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Title = styled.Text`
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    margin-top: 30px;
    align-self: center;
    margin-left: 10px;
    margin-right: 10px;
`;

const Container = styled.View`
    color: white;
    height: 520px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const TitleMovie = styled.Text `
    font-size: 35px;
    margin-top: 250px;
    color: #fff;
    align-self: center;
`;

const MovieOverview = styled.Text `
    font-size: 15px;
    margin-left: 15px;
    margin-right: 15px;
    color: #fff;
`;


const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrendig);
            setMovie(request.data.results[Math.floor(Math.random()* request.data.results.length -1)]);
        return request;
        }
        fetchData();
    },[]);

    function description(str, n) {
        return str?.length > n ? str.substr(0, n -1) + "..." :str;
    }

    return (
        <Container>
                <ImageBackground style={styledd.image} source={{uri: base_url + movie?.backdrop_path}}>
                    <LinearGradient style={{height: 520}} colors={['rgba(0,0,0,0.5)','rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,1)']}>
                        <Title>STREMEEN</Title>
                        <TitleMovie> {description(movie?.title || movie?.name, 20)} </TitleMovie>
                        <MovieOverview> {description(movie?.overview, 150)} </MovieOverview>
                        <ResultsImage movies={movie} banner />
                    </LinearGradient>
                </ImageBackground>
        </Container>

    )
}

const styledd = StyleSheet.create({
    image: {
        width: '100%',
        height: 520,
    },
})

export default Banner;
