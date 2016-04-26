import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { IonContent, IonList, IonItem, IonButton } from 'reactionic';

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirm = this.refs.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }
    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, err => {
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
        <h1>Join.</h1>
        <p>Joining allows you to make private lists</p>
        // <p>error messages....</p>
        <form onSubmit={this.onSubmit}>
          <IonList>
            <IonItem input>
              <input type="email" name="email" ref="email" placeholder="Your Email" />
            </IonItem>
            <IonItem input>
              <input type="password" name="password" ref="password" placeholder="Password" />
            </IonItem>
            <IonItem input>
              <input type="password" name="confirm" ref="confirm" placeholder="Confirm Password" />
            </IonItem>
          </IonList>
          <IonButton type="submit" expand="full">Sign in</IonButton>
        </form>
        <Link to="/join">Have an account? Sign in</Link>;
      </IonContent>
    );
  }
}

Join.contextTypes = {
  router: React.PropTypes.object,
};
