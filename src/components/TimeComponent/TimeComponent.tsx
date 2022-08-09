import React, { useState, useRef, useEffect, FunctionComponent } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { GrRotateRight } from 'react-icons/gr'
import click from '/click.mp3'
import alarm from '/alarm.mp3'

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
  let audio: any = new Audio(click)
  let alarmAudio: any = new Audio(alarm)

  const [timer, setTimer] = useState<string>('00:00')
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

  const clickSound = () => {
    audio
      .play()
      .then(() => {
        console.log('click')
      })
      .catch((e: any) => {
        console.log(e)
      })
  }

  const alarmSound = () => {
    alarmAudio
      .play()
      .then(() => {
        console.log('click')
      })
      .catch((e: any) => {
        console.log(e)
      })
  }

  const getTimeRemaining = (e: any) => {
    const total: any = Date.parse(e) - Date.parse(new Date().toString())
    const secondsT = Math.floor((total / 1000) % 60)
    const minutesT = Math.floor((total / 1000 / 60) % 60)
    return {
      total,
      minutesT,
      secondsT
    }
  }

  const startTimer = (e: any) => {
    let { total, minutesT, secondsT } = getTimeRemaining(e)
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      let time = `${
        minutesT < 9 && minutesT.toString().length === 1
          ? '0' + minutesT
          : minutesT
      }:${
        secondsT < 9 && secondsT.toString().length === 1
          ? '0' + secondsT
          : secondsT
      }`
      setTimer(time)
      if (time === '00:00') {
        alarmSound()
      }
    }
  }

  const clearTimer = (e: any, minutes: any, seconds: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next

    setTimer(
      `${
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
      if (!pause) startTimer(e)
    }, 1000)
    Ref.current = id
  }

  useEffect(() => {
    if (pause) clearInterval(Ref.current)
    else {
      let [minutes, seconds] = timer.split(':')
      let deadline = new Date()

      deadline.setMinutes(deadline.getMinutes() + parseInt(minutes))
      deadline.setSeconds(deadline.getSeconds() + parseInt(seconds))
      setTimer(`${minutes}:${seconds}`)
      clearTimer(deadline, minutes, seconds)
    }
  }, [pause])

  const getDeadTime = () => {
    let deadline = new Date()

    deadline.setMinutes(deadline.getMinutes() + minutes)
    deadline.setSeconds(deadline.getSeconds() + seconds)
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadTime(), minutes, seconds)
  }, [flag])

  const onClickReset = () => {
    clearTimer(getDeadTime(), minutes, seconds)
    clickSound()
  }

  const onClickPause = (val: boolean) => {
    setPause(val)
    clickSound()
  }

  const onClickStop = () => {
    setTimer('00:00')
    setPause(true)
    clearTimer(new Date(), 0, 0)
    clickSound()
  }

  return (
    <>
      <div className="flex flex-wrap justify-center py-10 gap-5 grow">
        <div className="text-slate-700 text-6xl lg:text-9xl font-semibold dark:text-slate-500">
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
          onClick={() => onClickPause(!pause)}
        >
          {pause ? (
            <FaPlay className="text-slate-200 hover:scale-125" size={18} />
          ) : (
            <FaPause className="text-slate-200 hover:scale-125" />
          )}
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
