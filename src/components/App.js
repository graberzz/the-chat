import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RoomList from './RoomList';
import Chat from './Chat';
import Preloader from './Preloader';
import { vars, Container, Button, NoRoomSelected } from './common';
import * as selectors from 'reducers';
import * as actions from 'actions';
import * as api from 'api';

const AppWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 80px);
  background-color: #fff;
  box-shadow: ${vars.boxShadow};

  @media(max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const Panel = styled.div`
  height: 100%;
  padding: 10px;
`;

const LeftPanel = Panel.extend`
  width: 40%;
  padding-top: 25px;
  overflow: hidden;

  @media(max-width: 800px) {
    position: absolute;
    margin-top: 40px;
    z-index: 9999;
    width: 95vw;
    background-color: #fff;
    max-height: 0px;
    height: 0;
    transition: max-height 1s;
    padding: 0;

    &.open {
      max-height: 1000px;
      height: auto;
    }
  }
`;

const LeftPanelToggle = styled.div`
  display: none;
  height: 25px;
  color: #fff;
  background: ${vars.mainColor};
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  
  @media(max-width: 800px) {
    display: block;
  }
`;

const RightPanel = Panel.extend`
  position: relative;
  width: 60%;
  padding-bottom: 110px;
  background-color: #eee;

  @media(max-width: 800px) {
    width: 100%;
  }
`;


const RoomInput = styled.input`
  width: 100%;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-size: 1rem;
`;

const msgAudio = new Audio('/msg.mp3');
const playMsgAudio = () => {
  msgAudio.play();
}

class App extends React.Component {
  state = {
    leftPanelOpen: false,
  }

  componentDidMount() {
    api.watchRooms((room) => {
      this.props.onNewRoom(room);
    });

    api.watchNewMessages(Date.now(), (message) => {
      this.props.onNewMessage(message);

      const isNotOwnMessage = this.props.user && this.props.user.email !== message.user.email;
      const isNotLoggedIn = !this.props.user;
      
      if (isNotOwnMessage || isNotLoggedIn) {
        playMsgAudio();
      }
    });

    api.watchTypers((typers) => {
      this.props.onUpdateTypers(typers);
    });
  }

  onLeftPanelToggle = () => {
    this.setState({
      leftPanelOpen: !this.state.leftPanelOpen,
    });
  }

  onAddRoom = () => {
    if (this.roomInput.value.trim() === '') return;
    
    api.addRoom(this.roomInput.value, this.props.user.username);
    this.roomInput.value = '';
  }

  render() {
    const { user, rooms, fetchingRooms } = this.props;
    const { leftPanelOpen } = this.state;

    return (
      <Container>
        <AppWrap>
          <LeftPanel className={leftPanelOpen ? 'open' : ''}>
            {fetchingRooms ? <Preloader /> :
              <RoomList rooms={rooms} />}
            {user !== null &&
              <React.Fragment>
                <RoomInput
                  innerRef={ref => this.roomInput = ref}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      this.onAddRoom();
                    }
                  }}
                />
                <Button onClick={this.onAddRoom}>New Room</Button>
              </React.Fragment>}
          </LeftPanel>
          <RightPanel>
            <LeftPanelToggle onClick={this.onLeftPanelToggle}>
              {leftPanelOpen ? '↑ ROOMS ↑' : '↓ ROOMS ↓'}
            </LeftPanelToggle>
            <Switch>
              <Route path='/:id' component={Chat} />
              <Route render={() => <NoRoomSelected>Select Room</NoRoomSelected>} />
            </Switch>
          </RightPanel>
        </AppWrap>
      </Container>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  rooms: PropTypes.array,
  fetchingRooms: PropTypes.bool,
  onNewRoom: PropTypes.func.isRequired,
  onNewMessage: PropTypes.func.isRequired,
  onUpdateTypers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  user: selectors.getUser(state),
  rooms: selectors.getRooms(state),
  fetchingRooms: selectors.getIsFetchingRooms(state),
});

const mapDispatchToProps = {
  onNewRoom: actions.recieveRoom,
  onNewMessage: actions.recieveMessage,
  onUpdateTypers: actions.updateTypers,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
