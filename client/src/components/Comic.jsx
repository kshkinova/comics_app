import React, {Component} from "react";
import axios from 'axios';
import { API_ENV } from '../Constants';

class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
    axios.get(`${API_ENV}/current`).then(res => {
      this.setState({last_id: res.data.num});
    })
    .catch(err => console.log(err));

    let id = this.props.match.params.id;
    if (id == null) {
      id = 'current';
    }
      
    this.getComicById(id);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.getComicById(this.props.match.params.id);
    }
  }

  getComicById = async (id) => {
    axios.get(`${API_ENV}/${id}`).then(res => {
      console.log(this.state.last_id);
      this.setState({last_id: this.state.last_id, ...res.data});
    })
    .catch(err => console.log(err));
  }

  getNext = () => {
    const {num, last_id} = this.state;
    let nextId = Math.min(num+1,last_id);
    this.props.history.push(`${nextId}`);
  }

  getPrev = () => {
    const {num} = this.state;
    let prevId = Math.max(num-1,1);
    this.props.history.push(`${prevId}`);
  }

  getRandom = () => {
    const {last_id} = this.state;
    let randId = Math.floor(Math.random() * last_id + 1);
    this.props.history.push(`${randId}`);
  }

  render() {
    const { img, safe_title, title, alt, year, month, day, transcript } = this.state;
    let comic_date = new Date(year, month, day);
    let parsed_transcript = transcript == null ? null : 
      transcript.replace(/ *\{\{[^)]*\}\} */g, "").split(/[\[[\]]/).join('\n').replace(/\n{2,}/g, '\n');
    console.log(!parsed_transcript);
    return (
      <div className="container">
        <nav>
          <div className='links'>
            <a onClick={this.getPrev} className="prev">&#9664; Prev</a>
            <a onClick={this.getRandom}>Random</a>
            <a onClick={this.getNext} className="next">Next &#9658;</a>
          </div>
        </nav>
        
        <section>

        <div className="logo">{title}</div>
        <p className="date">{comic_date.toDateString()}</p>
        <img src={img} alt={alt}/>

        {parsed_transcript ? (
          <div className="transcript">
            <p className="tr-header">Transcript:</p><p/>
            {parsed_transcript}
          </div>) : <div/>}
        </section>

        
      </div>
    );
  }
}

export default Comic;