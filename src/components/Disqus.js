/* eslint-disable */

import React, { Component } from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import config from '../../config'

class Disqus extends Component {
  constructor(props) {
    super(props)
    this.state = { toasts: [] }
    this.notifyAboutComment = this.notifyAboutComment.bind(this)
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this)
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts
    this.setState({ toasts })
  }

  notifyAboutComment() {
    const toasts = this.state.toasts.slice()
    toasts.push({ text: 'New comment available!!' })
    this.setState({ toasts })
  }

  render() {
    const { postPath, postNode } = this.props
    const post = postNode.frontmatter
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const homeURL = `${config.siteUrl}${realPrefix}`
    const url = `${homeURL}${postPath || ''}`

    return (
      <ReactDisqusComments
        shortname={config.disqusShortname}
        identifier={post.title}
        title={post.title}
        url={url}
        category_id={post.category_id}
        onNewComment={this.notifyAboutComment}
      />
    )
  }
}

export default Disqus
