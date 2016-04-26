# TODOs React-Ionic-Meteor Example App

## React and Ionic: a Perfect Match

I like what @pors and [reactionic](http://reactionic.github.io/) are trying to do.  I've have been working on trying to get things upgraded to React 15 and at the same time have been tinkering with trying to make this app at the same time.

As much as possible I have tried to just copy over Meteor's todos-react example
and just change as little as possible except the UI.

NOTE: for some reason tests were really screwing things up so I just removed all that stuff for now.

There is still some things to do to have full functionality as well as to make
things look pretty.

At the moment this is dependent on the [johnslemmer/reactionic fork](https://github.com/johnslemmer/reactionic)

## TODOs

* I have a bug where the IonContent is not setting bar-subheader classname correctly so that the content is partially sitting under the subheader bar.  As best as I can tell right now the componentWillUnmount method of the page we are leaving is getting called after the componentWillMount method of the page we are entering is called.  I think this might actually be a React bug, if not then
it is something that might need to be fixed in @reactionic.  Anyone have any
thoughts?
* Finish UI functionality (things are really only readable at the moment)
  * Be able to add todos
  * login as a user
  * logout
  * be able to add lists
  * make lists lock/unlock private/public
  * delete lists
  * delete todo items (would love to make this a list item swipe thing, thing ios email app and deleting/archiving emails with a swipe to the left) but I don't think that IonListButton component in @reactionic is working quite yet
* Develop a nice look and feel and css etc.
