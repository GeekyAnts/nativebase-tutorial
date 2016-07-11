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
            search: 'nativebase',
            selectedItem: undefined,
            results: {
                items: []
            }
        }
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
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
        // Set loading to true when the search starts to display a Spinner
        this.setState({
            loading: true
        });

        var that = this;
        return fetch('https://api.github.com/search/repositories?q='+this.state.search)
            .then((response) => response.json())
            .then((responseJson) => {
                // Store the results in the state variable results and set loading to 
                // false to remove the spinner and display the list of repositories
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
                                <ListItem button onPress={()=>this.setModalVisible(true, item)} >
                                    <Thumbnail square size={80} source={{uri: item.owner.avatar_url}} />
                                    <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{item.name}</Text></Text>

                                    <Text style={{color:'#007594'}}>{item.full_name}</Text>
                                    <Text note>Score: <Text note style={{marginTop: 5}}>{item.score}</Text></Text>
                                </ListItem>
                            } />}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                        <Card style={{paddingTop: 20}}>
                            {!this.state.selectedItem ? <View />
                            :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
                                <Image style={styles.modalImage} source={{uri: this.state.selectedItem.owner.avatar_url}}  />
                                <H3 style={styles.header}> {this.state.selectedItem.name}
                                </H3>
                                <Text style={styles.negativeMargin} >
                                    Type: <Text style={styles.bold}>{this.state.selectedItem.owner.type}</Text>
                                </Text>
                                <Text style={styles.negativeMargin} >
                                    Stars: <Text style={styles.bold}>{this.state.selectedItem.stargazers_count}</Text>
                                </Text>
                                <Text style={styles.negativeMargin} >
                                    Language: <Text style={styles.bold}>{this.state.selectedItem.language}</Text>
                                </Text>
                                <Text style={styles.negativeMargin} >
                                    Open Issues: <Text style={styles.bold}>{this.state.selectedItem.open_issues_count}</Text>
                                </Text>
                                <Text>
                                    Last Update: <Text style={styles.bold}>{this.state.selectedItem.updated_at.slice(0,10)}</Text>
                                </Text>
                                <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                    }}>
                                    Go Back
                                </Button>
                            </CardItem>
                            }
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
        lineHeight: 24,
        color: '#5357b6'
    },
    modalImage: {
        resizeMode: 'contain',
        height: 200
    },
    bold: {
        fontWeight: '600'
    },
    negativeMargin: {
        marginBottom: -10
    }
});


AppRegistry.registerComponent('nativebaseTutorial', () => nativebaseTutorial);
