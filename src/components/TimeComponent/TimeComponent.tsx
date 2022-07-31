import React, { useState, useRef, useEffect, FunctionComponent } from 'react'

interface Props {
  hours: number
  minutes: number
  seconds: number
  flag: boolean
}

const TimerComponent: FunctionComponent<Props> = (props: Props) => {
  const { hours, minutes, seconds, flag } = props
  const Ref = useRef<any>(null)

  const [timer, setTimer] = useState<any>('00:00:00')

  const getTimeRemaining = (e: any) => {
    const total: any = Date.parse(e) - Date.parse(new Date().toString())
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

  const startTimer = (e: any) => {
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

  const clearTimer = (e: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer(
      `${hours < 9 ? '0' + hours : hours}:${
        minutes < 9 ? '0' + minutes : minutes
      }:${seconds < 9 ? '0' + seconds : seconds}`
    )

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
    deadline.setHours(deadline.getHours() + hours)
    deadline.setMinutes(deadline.getMinutes() + minutes)
    deadline.setSeconds(deadline.getSeconds() + seconds)
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadTime())
  }, [flag])

  const onClickReset = () => {
    clearTimer(getDeadTime())
  }

  return (
    <>
      <div className="flex flex-wrap justify-center p-10 gap-10 grow">
        <div>
          <h2>{timer}</h2>
        </div>
      </div>
      <div className="flex flex-wrap justify-center  gap-10 grow">
        <button
          className="px-12 py-2 tracking-wider rounded-lg shadow-lg bg-slate-400 hover:ring-2 hover:bg-slate-500 hover:text-slate-100 ring-slate-400 ring-offset-2"
          onClick={onClickReset}
        >
          Reset
        </button>
      </div>
    </>
  )
}

export default TimerComponent
