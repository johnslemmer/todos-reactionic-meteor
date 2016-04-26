import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/lists/methods.js';

export default class ListList extends React.Component {
  constructor(props) {
    super(props);

    this.createNewList = this.createNewList.bind(this);
  }

  createNewList() {
    const { router } = this.context;
    const listId = insert.call((err) => {
      if (err) {
        router.push('/');
        /* eslint-disable no-alert */
        alert('Could not create list.');
      }
    });
    router.push(`/lists/${listId}`);
  }

  render() {
    const { lists } = this.props;
    return (
      <div className="list">
        {lists.map(list => (
          <Link
            to={`/lists/${list._id}`}
            key={list._id}
            title={list.name}
            className="item"
            onClick={ () => { this.context.ionSnapper.toggle('left'); } }
          >
            {list.userId
              ? <span className="ion-lock"></span>
              : null}
            {list.name}
            {list.incompleteCount
              ? <span className="count-list"> COUNT: {list.incompleteCount}</span>
              : null}
          </Link>
        ))}
      </div>
    );
  }
}

ListList.propTypes = {
  lists: React.PropTypes.array,
};

ListList.contextTypes = {
  router: React.PropTypes.object,
  ionSnapper: React.PropTypes.object,
};
