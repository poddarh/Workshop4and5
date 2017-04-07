import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server.js';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedLikeCounter) => {
        var comment = this.state.comment
        comment.likeCounter = updatedLikeCounter
        this.setState({comment: comment});
      };

      if (this.didUserLike()) {
        unlikeComment(this.state.feedItemId, this.state.commentIndex, 4, callbackFunction);
      } else {
        likeComment(this.state.feedItemId, this.state.commentIndex, 4, callbackFunction);
      }
    }
  }

  /**
   * Returns 'true' if the user liked the item.
   * Returns 'false' if the user has not liked the item.
   */
  didUserLike() {
    var likeCounter = this.state.comment.likeCounter;
    var liked = false;
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }

  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()) {
      likeButtonText = "Unlike";
    }
    var data = this.state;
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + data.comment.author._id}>{data.comment.author.fullName}</Link> {data.comment.content}
          <br />
          <a href="#" onClick={(e) => this.handleLikeClick(e)}>
            <span className="glyphicon glyphicon-thumbs-up"></span> {likeButtonText}
          </a> · <a href="#">Reply</a> · {data.comment.likeCounter.length} likes ·
            {unixTimeToString(data.comment.postDate)}
        </div>
      </div>
    )
  }
}