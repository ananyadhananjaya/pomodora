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

  const [timer, setTimer] = useState<string>('00:00:00')
  const [formatSec, setFormatSec] = useState<string | number>('00')
  const [formatMin, setFormatMin] = useState<string | number>('00')
  const [formatHour, setFormatHour] = useState<string | number>('00')
  const [pause, setPause] = useState<boolean>(false)

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
    setFormatHour(hoursT > 9 ? hoursT : '0' + hoursT)
    setFormatMin(minutesT > 9 ? minutesT : '0' + minutesT)
    setFormatSec(secondsT < 9 ? '0' + secondsT : secondsT.toString())
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
    setFormatHour(hours < 9 ? '0' + hours : hours)
    setFormatMin(minutes < 9 ? '0' + minutes : minutes)
    setFormatSec(seconds < 9 ? '0' + seconds : seconds)

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec

    if (Ref.current || pause) clearInterval(Ref.current)

    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }
  useEffect(() => {
    if (pause) clearInterval(Ref.current)
    else {
      let [hours, minutes, seconds] = timer.split(':')
      let deadline = new Date()

      // This is where you need to adjust if
      // you entend to add more time
      deadline.setHours(deadline.getHours() + parseInt(hours))
      deadline.setMinutes(deadline.getMinutes() + parseInt(minutes))
      deadline.setSeconds(deadline.getSeconds() + parseInt(seconds))
      setTimer(
        `${parseInt(hours) < 9 ? '0' + hours : hours}:${
          parseInt(minutes) < 9 ? '0' + minutes : minutes
        }:${parseInt(seconds) < 9 ? '0' + seconds : seconds}`
      )
      clearTimer(deadline)
    }
  }, [pause])

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

  const onClickPause = () => {
    setPause(!pause)
  }

  return (
    <>
      <div className="flex flex-wrap justify-center py-10 gap-5 grow">
        <div className="text-slate-700 text-6xl lg:text-9xl font-semibold">
          {timer}
        </div>
      </div>
      <div className="flex flex-wrap justify-center  gap-10 grow">
        <div>
          <button
            className="px-12 py-2 tracking-wider rounded-lg shadow-lg bg-slate-400 hover:ring-2 hover:bg-slate-500 hover:text-slate-100 ring-slate-400 ring-offset-2"
            onClick={onClickReset}
          >
            Reset
          </button>
        </div>
        <div>
          <button
            className="px-12 py-2 tracking-wider rounded-lg shadow-lg bg-slate-400 hover:ring-2 hover:bg-slate-500 hover:text-slate-100 ring-slate-400 ring-offset-2"
            onClick={() => onClickPause()}
          >
            Pause
          </button>
        </div>
      </div>
    </>
  )
}

export default TimerComponent
