import { Meteor } from 'meteor/meteor';
import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import { IonNavView, IonView, IonNavBar, IonSideMenuContainer, IonSpinner,
  IonSideMenus, IonSideMenu, IonSideMenuContent } from 'reactionic';
// import UserMenu from '../components/UserMenu.jsx';
import ListList from '../components/ListList.jsx';
import { Lists } from '../../api/lists/lists.js';

const CONNECTION_ISSUE_TIMEOUT = 5000;

// const loadingTemplate = (
//   <div>
//     <IonSpinner icon="spiral" customClasses="inloader spinner-light" />
//     <h2>TRYING TO CONNECT</h2>
//     <p>Please wait while processing.</p>
//   </div>
// );

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
    };
    this.logout = this.logout.bind(this);
    this.popupError = this.popupError.bind(this);
  }

  getChildContext() {
    return {
      popupError: this.popupError,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children }) {
    // redirect / to a list once lists are ready
    if (!loading && !children) {
      const list = Lists.findOne();
      this.context.router.replace(`/lists/${list._id}`);
    }
  }

  logout() {
    Meteor.logout();

    // if we are on a private list, we'll need to go to a public one
    if (this.props.params.id) {
      const list = Lists.findOne(this.props.params.id);
      if (list.userId) {
        const publicList = Lists.findOne({ userId: { $exists: false } });
        this.context.router.push(`/lists/${publicList._id}`);
      }
    }
  }

  popupError(error) {
    this.context.ionUpdatePopup({
      popupType: 'alert',
      title: 'Error',
      template: TAPi18n.__(error.error),
      okText: 'OK',
    });
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      children,
      location,
    } = this.props;

    // this.context.ionShowLoading(showConnectionIssue && !connected, {
    //   backdrop: true,
    //   customTemplate: loadingTemplate,
    // });

    return (
      <IonSideMenuContainer disable="right" {...this.props}>
        <IonSideMenus>
          <IonSideMenu customClasses="side-menu">
            <div className="bar bar-header bar-stable">
              <h1 className="title">Lists</h1>
            </div>
            <div className="content has-header side-menu">
              <ListList {...this.props} />
            </div>
          </IonSideMenu>
        </IonSideMenus>
        <IonSideMenuContent>
          <IonNavBar customClasses="bar-dark"
            title="ReactIonic Todos"
            {...this.props}
          />
          <IonNavView customClasses="" {...this.props}>
            <IonView customClasses="" {...this.props}>
              {loading
                ? <IonSpinner icon="spiral" />
                : children}
            </IonView>
          </IonNavView>
        </IonSideMenuContent>
      </IonSideMenuContainer>
    );
  }
}

Main.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
  loading: React.PropTypes.bool,     // subscription status
  lists: React.PropTypes.array,      // all lists visible to the current user
};

Main.contextTypes = {
  router: React.PropTypes.object,
  ionUpdatePopup: React.PropTypes.func,
  ionShowLoading: React.PropTypes.func,
};

Main.childContextTypes = {
  popupError: React.PropTypes.func,
};
