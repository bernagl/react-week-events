# react-week-events

> A React.js responsive week calendar to show/handle events

[![NPM](https://img.shields.io/npm/v/react-week-events.svg)](https://www.npmjs.com/package/react-week-events) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-week-events
yarn add react-week-events
```

## Usage

```jsx
import React, { Component } from 'react'
import WeekCalendar from 'react-week-events'
import 'react-week-calendar/dist/styles.css'

class Example extends Component {
  state = {
    events: [
      { name: 'Event 1', date: new Date() },
      { name: 'Event 2', date: new Date() },
      { name: 'Event 3', date: new Date() }
    ]
  }

  eventRender = event => (
    <div onClick={() => console.log(event)}>{event.name}</div>
  )

  emptyRender = () => <div>No events</div>

  render() {
    const { events } = this.state
    return (
      <WeekCalendar
        events={events}
        emptyRender={this.emptyRender}
        eventRender={this.eventRender}
        past={true}
      />
    )
  }
}
```

##### Important: This component needs moment.js :tw-203c:

---

# Props

| Prop        | Type     | Default               | Description                                               |
| ----------- | -------- | --------------------- | --------------------------------------------------------- |
| dateLabel   | String   | 'date'                | Object date value name for render event on respective day |
| events      | []       | []                    | List of events to render                                  |
| emptyRender | Function | () => 'No event'      | Message to show when no event                             |
| eventRender | Function | (event) => event.name | Function to render and handle the event                   |
| past        | Boolean  | true                  | Option to show past dates                                 |

## License

MIT © [bernagl](https://github.com/bernagl)
