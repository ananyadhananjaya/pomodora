import React, { useState, useRef, useEffect, FunctionComponent } from 'react'
import { FaPause, FaStop } from 'react-icons/fa'
import { GrRotateRight } from 'react-icons/gr'

interface Props {
  hours: number
  minutes: number
  seconds: number
  flag: boolean
  typeOfPomo: string
}

const TimerComponent: FunctionComponent<Props> = (props: Props) => {
  const { hours, minutes, seconds, flag, typeOfPomo } = props
  const Ref = useRef<any>(null)

  const [timer, setTimer] = useState<string>('00:00:00')
  const [pause, setPause] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('...')

  useEffect(() => {
    switch (typeOfPomo) {
      case 'Pomodora':
        setMessage(
          `Let's focus for ${hours > 0 ? hours + ' Hours' : ''}  ${
            minutes > 0 ? minutes + ' Minutes' : ''
          } ${seconds > 0 ? seconds + ' seconds' : ''}!`
        )
        break
      case 'Short Break':
        setMessage(
          `Take a break for ${hours > 0 ? hours + ' Hours' : ''}  ${
            minutes > 0 ? minutes + ' Minutes' : ''
          } ${seconds > 0 ? seconds + ' seconds' : ''}!`
        )
        break
      case 'Long Break':
        setMessage(
          `Chill for ${hours > 0 ? hours + ' Hours' : ''}  ${
            minutes > 0 ? minutes + ' Minutes' : ''
          } ${seconds > 0 ? seconds + ' seconds' : ''}!`
        )
        break
      default:
        setMessage('...')
    }
  }, [typeOfPomo])

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
        `${
          hoursT < 9 && hoursT.toString().length == 1 ? '0' + hoursT : hoursT
        }:${
          minutesT < 9 && minutesT.toString().length === 1
            ? '0' + minutesT
            : minutesT
        }:${
          secondsT < 9 && secondsT.toString().length === 1
            ? '0' + secondsT
            : secondsT
        }`
      )
    }
  }

  const clearTimer = (e: any, hours: any, minutes: any, seconds: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next

    setTimer(
      `${hours < 9 && hours.toString().length == 1 ? '0' + hours : hours}:${
        minutes < 9 && minutes.toString().length === 1 ? '0' + minutes : minutes
      }:${
        seconds < 9 && seconds.toString().length === 1 ? '0' + seconds : seconds
      }`
    )

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
      setTimer(`${hours}:${minutes}:${seconds}`)
      clearTimer(deadline, hours, minutes, seconds)
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
    clearTimer(getDeadTime(), hours, minutes, seconds)
  }, [flag])

  const onClickReset = () => {
    clearTimer(getDeadTime(), hours, minutes, seconds)
  }

  const onClickPause = () => {
    setPause(!pause)
  }

  const onClickStop = () => {
    setTimer('00:00:00')
    clearTimer(new Date(), 0, 0, 0)
  }

  return (
    <>
      <div className="flex flex-wrap justify-center py-10 gap-5 grow">
        <div className="text-slate-700 text-6xl lg:text-9xl font-semibold">
          {timer}
        </div>
      </div>
      <div className="py-4 text-slate-600 dark:text-slate-400">
        <div className="text-center tracking-wide font-sans">{message}</div>
      </div>
      <div className="flex flex-wrap justify-center  gap-10 grow">
        <div
          className="w-12 h-12 flex flex-row items-center gap-2 justify-center bg-slate-200 rounded-full shadow-lg hover:cursor-pointer hover:shadow-xl hover:bg-slate-300 hover:scale-105"
          onClick={onClickReset}
        >
          <GrRotateRight className="text-slate-500 font-bold" size={24} />
        </div>
        <div
          className="w-16 h-16 flex flex-row items-center gap-2 justify-center bg-red-500 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-red-600 hover:scale-105"
          onClick={() => onClickPause()}
        >
          <FaPause className="text-slate-200 hover:scale-125" />
        </div>
        <div
          className="w-12 h-12 flex flex-row items-center gap-2 justify-center bg-slate-200 rounded-full shadow-lg hover:cursor-pointer hover:shadow-xl hover:bg-slate-300 hover:scale-105"
          onClick={() => onClickStop()}
        >
          <FaStop className="text-slate-500" />
        </div>
      </div>
    </>
  )
}

export default TimerComponent
