import React, { useState, useRef, useEffect, FunctionComponent } from 'react'

interface Props {
  hours: number
  minutes: number
  seconds: number
}

const TimerComponent: FunctionComponent<Props> = (props: Props) => {
  const { hours, minutes, seconds } = props
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null)

  const [timer, setTimer] = useState<any>('00:00:00')

  const getTimeRemaining = (e) => {
    const total: any = Date.parse(e) - Date.parse(new Date())
    const secondsT = Math.floor((total / 1000) % 60)
    const minutesT = Math.floor((total / 1000 / 60) % 60)
    const hoursT = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      hoursT,
      minutesT,
      secondsT
    }
  }

  const startTimer = (e) => {
    let { total, hoursT, minutesT, secondsT } = getTimeRemaining(e)
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hoursT > 9 ? hoursT : '0' + hoursT) +
          ':' +
          (minutesT > 9 ? minutesT : '0' + minutesT) +
          ':' +
          (secondsT > 9 ? secondsT : '0' + secondsT)
      )
    }
  }

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer(`${hours}:${minutes}:${seconds}`)

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current)
    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setHours(deadline.getSeconds() + hours)
    deadline.setMinutes(deadline.getMinutes() + minutes)
    deadline.setSeconds(deadline.getHours() + seconds)
    return deadline
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime())
  }, [])

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime())
  }

  return (
    <div className="flex justify-center">
      <h2>{timer}</h2>
      <button onClick={onClickReset}>Reset</button>
    </div>
  )
}

export default TimerComponent
