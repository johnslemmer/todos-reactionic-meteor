import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { IonContent, IonList, IonItem, IonButton } from 'reactionic';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      this.context.router.push('/');
    });
  }

  render() {
    // const { errors } = this.state;
    // const errorMessages = Object.keys(errors).map(key => errors[key]);
    // const errorClass = key => errors[key] && 'error';

    return (
      <IonContent customClasses="" {...this.props}>
        <h1>Sign In.</h1>
        <p>Signing in allows you to view private lists</p>
        // <p>error messages....</p>
        <form onSubmit={this.onSubmit}>
          <IonList>
            <IonItem input>
              <input type="email" name="email" ref="email" placeholder="Your Email" />
            </IonItem>
            <IonItem input>
              <input type="password" name="password" ref="password" placeholder="Password" />
            </IonItem>
          </IonList>
          <IonButton type="submit" expand="full">Sign in</IonButton>
        </form>
        <Link to="/join">Need an account? Join Now.</Link>;
      </IonContent>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object,
};
