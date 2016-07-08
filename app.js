/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import { AppRegistry, StyleSheet, Modal, Image, Platform } from 'react-native';
 import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3 } from 'native-base';

 class nativebaseTutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio1 : true,
            check1: false,
            modalVisible: false,
            search: 'a',
            results: {
                items: []
            }
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
     }
    toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
    }
    componentDidMount() {

        var that = this;
        this.search();

    }

    search() {

        this.setState({
            loading: true
        });

        var that = this;
        return fetch('https://api.github.com/search/repositories?q='+this.state.search)
            .then((response) => response.json())
            .then((responseJson) => {

                console.log('!@#@!#@#', responseJson);

                that.setState({
                    results: responseJson,
                    loading: false
                });

                return responseJson.Search;
            })
            .catch((error) => {

                that.setState({
                    loading: false
                });

                console.error(error);
        });
    }
    render() {

        var that = this;

        return (
            <Container>
                <Header searchBar rounded>
                    <InputGroup>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
                    </InputGroup>
                    <Button transparent onPress={()=>this.search()}>Go</Button>
                </Header>
                <Content>
                    {this.state.loading? <Spinner /> : <List dataArray={this.state.results.items} renderRow={(item) => 

                                 <ListItem button onPress={()=>this.setModalVisible(true)} >
                                    <Thumbnail square size={80} source={{uri: item.owner.avatar_url}} />
                                    <Text>{item.name}</Text>
                                    <Text>{item.full_name}</Text>
                                    <Text note style={{marginTop: 5}}>{item.score}
                                    </Text>
                                </ListItem>
                            } />}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                        <Card style={{paddingTop: 50}}>
                            <CardItem cardBody style={{justifyContent: 'flex-start'}}>
                                <Image style={styles.modalImage} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}  />
                                <H3 style={styles.header}> Movie name
                                </H3>
                                <Text style={{marginBottom: 10}}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.
                                </Text>
                                <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                    }}>
                                    Go Back
                                </Button>
                            </CardItem>
                        </Card>

                    </Modal>
            </Content>
            </Container>
         );
     }
 }
const styles = StyleSheet.create({
    header : {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: (Platform.OS==='ios') ? -7 : 0,
        lineHeight: 24
    },
    modalImage: {
        resizeMode: 'cover',
        height: 200
    }
});


AppRegistry.registerComponent('nativebaseTutorial', () => nativebaseTutorial);
