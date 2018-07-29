import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import './styles.css'

export default class WeekCalendar extends Component {
  state = {
    week: 0,
    event: null,
    month: moment().format('MMMM'),
    dates: [],
    weekDays: [
      { events: [] },
      { events: [] },
      { events: [] },
      { events: [] },
      { events: [] },
      { events: [] },
      { events: [] }
    ]
  }

  componentDidMount() {
    const { events } = this.props
    this.setState({ events }, () => this.daysHandler(0))
  }

  componentWillReceiveProps(newProps) {
    newProps.events !== this.props.events &&
      this.setState({ events: newProps.events }, () => this.daysHandler(0))
  }

  daysHandler = sum => {
    const { events, weekDays, week } = this.state
    const { dateLabel, past } = this.props
    let weekNumber = week + sum
    weekNumber = weekNumber < 0 && !past ? 0 : weekNumber
    var startOfWeek = moment()
      .add(weekNumber, 'weeks')
      .startOf('isoWeek')
    var endOfWeek = moment()
      .add(weekNumber, 'weeks')
      .endOf('isoWeek')

    var days = []
    var day = startOfWeek

    while (day <= endOfWeek) {
      days.push(day.toDate())
      day = day.clone().add(1, 'd')
    }
    let d = [...weekDays]
    days.map((day, i) => {
      const evts = events.filter(
        (e, j) => moment(day).format('L') === moment(e[dateLabel]).format('L')
      )
      return (d[i] = { events: evts, name: d[i].name })
    })

    const month = moment(startOfWeek).format('MMMM')
    this.setState({
      week: weekNumber,
      dates: days,
      weekDays: d,
      month
    })
  }

  render() {
    const { dates, weekDays } = this.state
    const { emptyRender, eventRender } = this.props
    return (
      <div id="react-week-calendar">
        <div>
          <button
            onClick={() => this.daysHandler(-1)}
            className="btn"
          >{`<`}</button>
          <button
            onClick={() => this.daysHandler(1)}
            className="btn"
          >{`>`}</button>
        </div>
        <Header dates={dates} />
        <Body
          dates={dates}
          weekDays={weekDays}
          emptyRender={emptyRender}
          eventRender={eventRender}
        />
      </div>
    )
  }
}

export const Header = ({ dates }) => {
  return (
    <div className="week">
      <div className="week-header hidden-sm show-lg">
        {dates.map((e, i) => (
          <div className="row day" key={i}>
            <div className="col-12 header-day day-row">
              <b>{moment(e).format('dddd')}</b>
              <br />
              <b>{moment(e).format('DD MMMM')}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Body = ({ dates, weekDays, eventRender, emptyRender }) => {
  return (
    <div className="week week-events">
      {dates.map((e, i) => (
        <div className="row day" key={i}>
          <div className="col-12 hidden-lg day-row show-sm">
            <b>{moment(e).format('dddd')}</b>
            <br />
            <b>{moment(e).format('DD MMMM')}</b>
          </div>
          <div
            className={`col-12 event-list-parent ${moment().format('L') ===
              moment(e).format('L') && 'today'}`}
          >
            <div className="row event-list">
              {weekDays[i].events.length > 0
                ? weekDays[i].events.map((ev, j) => {
                    return (
                      <React.Fragment key={j}>
                        {eventRender(ev, j)}
                      </React.Fragment>
                    )
                  })
                : emptyRender()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

WeekCalendar.defaultProps = {
  dateLabel: 'date',
  emptyRender: () => <div className="empty-state">No event</div>,
  events: [],
  eventRender: event => (
    <div className="day-event fade event">{event.name}</div>
  ),
  past: true
}

WeekCalendar.propTypes = {
  dateLabel: PropTypes.string,
  emptyRender: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventRender: PropTypes.func.isRequired,
  past: PropTypes.bool
}
