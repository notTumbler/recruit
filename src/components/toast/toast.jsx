import React from 'react'
import PropTypes from 'prop-types'
import './toast.less'

export default class Toast extends React.Component {

  static propTypes = {
    toastData: PropTypes.string.isRequired,
    showTime: PropTypes.number.isRequired
  }

  state = {
    isShow: true
  }

  componentDidMount() {
    const { showTime } = this.props;
    // console.log(typeof(showTime));
    this.showOrHide(showTime);
  }
  showOrHide = (showTime) => {
    setTimeout(() => {
      this.setState({
        isShow: false
      })
    }, showTime)
  }

  render() {
    const { toastData } = this.props;
    return (
    <React.Fragment>
      {
        this.state.isShow ? <div className='toast' >{toastData}</div> : null
      }
    </React.Fragment>
    )
  }
}

