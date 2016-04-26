import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Main from '/imports/ui/layouts/Main.jsx';
import { Lists } from '/imports/api/lists/lists.js';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('lists.public');
  const privateHandle = Meteor.subscribe('lists.private');
  return {
    loading: !(publicHandle.ready() && privateHandle.ready()),
    lists: Lists.find({ $or: [
      { userId: { $exists: false } },
      { userId: Meteor.userId() },
    ] }).fetch(),
  };
}, Main);
