import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import movieTrailer from 'movie-trailer';
import { URL, URLSearchParams } from 'react-native-url-polyfill';
import YoutubePlayer from "react-native-youtube-iframe";
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons'; 

const base_url = 'https://image.tmdb.org/t/p/original/';

const TextClose = styled.Text `
    width: 100px;
    padding: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #f94144;
    color: #fff;
    border-radius: 15px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    align-self: center;
`;

const ErrorText = styled.Text`
    margin: 10px;
    padding: 15px;
    padding-top:40px;
    padding-bottom: 40px;
    background-color: #6c757d;
    color: #fff;
    border-radius: 15px;
    align-self: center;
    text-align: center;
    font-size: 20px;
`;
const ImageMovies = styled.Image`
    width: 140px;
    border-radius: 15px;
    margin: 10px;
    height: 230px;
`;

const MovieOverview = styled.Text`
    margin: 15px;
    font-size: 20px;
    text-align: justify;
    color: #fff;
`;

const MovieTitle = styled.Text`
    margin: 15px;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
`;

const DescriptionView = styled.View`
    background-color: #343a40;
    border-radius: 15px;
    margin: 10px;
    padding: 5px;
`;
const ReadMore = styled.Text `
    width: 100px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 30px;
    background-color: #6c757d;
    color: #fff;
    border-radius: 15px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    align-self: center;
`;

const ResultsImage = ({movies, banner}) => {
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTras, setModalTras] = useState (false);
    const [herror, setHerror] = useState('')

    const handlePress = (movies) => {
        if (trailerUrl) {
            setTrailerUrl(null);
        }else {
            movieTrailer(movies?.name || movies?.title || '').then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error)=>(setHerror('At the moment the title is not available, try later or try another title')));
        }
    }

    const closeModal = () => {
        setModalOpen(false);
        setModalTras(false);
        setTrailerUrl(null);
        setHerror('');
    }


    return (
        <View>
            <TouchableOpacity onPress={() => handlePress(movies, setModalOpen(true)) } >
                { banner ? <ReadMore style={{overflow:"hidden"}} >More</ReadMore> :
                <ImageMovies source={{uri : base_url + movies.backdrop_path }} />}
            </TouchableOpacity>

                <Modal visible={modalOpen} animationType='slide' transparent={modalTras}>
            <ScrollView>
                    {  trailerUrl && <YoutubePlayer /> ?
                        <YoutubePlayer
                                    height={250}
                                    width='100%'
                                    play={false}
                                    videoId={trailerUrl}
                                    onFullScreenChange={status => setModalTras(status)}
                                    /> 
                    :
                        <ActivityIndicator size="large" animating={true} color="#6c757d" style={{marginTop:30, marginBottom:20}} />
                    
                    }

                    {herror === '' ? null :  <ErrorText style={{overflow: 'hidden'}} > {herror} </ErrorText> }
                    {modalTras ? 
                    <AntDesign name="closecircle" size={24} color="#6c757d" onPress={()=> setModalTras(false)} />
                    : 
                    <DescriptionView>
                        <MovieTitle> {movies?.title || movies.name} </MovieTitle>
                        <MovieOverview> {movies?.overview} </MovieOverview>
                        <MovieOverview> Rating: {movies?.vote_average} </MovieOverview>
                        <TouchableOpacity onPress={closeModal}>
                            <TextClose style={{overflow: 'hidden'}} >CLOSE</TextClose>
                        </TouchableOpacity>
                    </DescriptionView>
                    }
                    </ScrollView>
                </Modal>
        </View>
    )
}


export default ResultsImage;