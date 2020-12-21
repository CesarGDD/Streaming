import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ResultsImage from './ResultsImage';
import styled from 'styled-components';
import axios from '../axios';

const Title = styled.Text`
    color: #fff;
    font-size: 20px;
    margin-left: 15px;
    font-weight: 800;
`

const Row = ({title, fetchUrl}) => {
    const [movies, setMovies] = useState([]);


    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl])

    return (
        <View>
            <Title>{title}</Title>
            <FlatList
            horizontal
            data={movies}
            keyExtractor={(movie) => movie.id.toString()}
            renderItem={({item})=>  {
                return <ResultsImage movies={item} />
            }}
            />
        </View>
    )
};


export default Row;