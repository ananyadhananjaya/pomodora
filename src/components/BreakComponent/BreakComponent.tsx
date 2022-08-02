import { FunctionComponent, useState } from 'react'
import TimerComponent from '../TimeComponent'
import { CgTimer } from 'react-icons/cg'
import { RiTimerLine, RiTimer2Line } from 'react-icons/ri'
import click from '/click.mp3'

const BreakComponent: FunctionComponent = () => {
  let audio = new Audio(click)
  const [pomodora, setPomodora] = useState<number>(25)
  const [shortBreak, setShortBreak] = useState<number>(5)
  const [longBreak, setLongBreak] = useState<number>(15)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [typeOfPomo, setTypeOfPomo] = useState<string>('')
  const [flag, setFlag] = useState<boolean>(true)

  const clickSound = () => {
    audio
      .play()
      .then(() => {
        console.log('click')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleTimer = (hours: number, minutes: number, seconds: number) => {
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
    setFlag(!flag)
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-10 grow">
        <div
          className={`${
            typeOfPomo === 'Pomodora'
              ? 'flex flex-col bg-slate-50 rounded-lg p-4 shadow-md hover:cursor-pointer hover:shadow'
              : 'flex flex-col bg-slate-200 rounded-lg p-4 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg'
          }`}
          onClick={() => {
            handleTimer(0, pomodora, 0)
            setTypeOfPomo('Pomodora')
            clickSound()
          }}
        >
          <div className="flex gap-2">
            <CgTimer className="m-auto" size={24} />
            <div className="font-mono font-bold"> Pomodoro Time</div>
          </div>
          <div className=" flex justify-center text-2xl">{pomodora}</div>
        </div>
        <div
          className={`${
            typeOfPomo === 'Short Break'
              ? 'flex flex-col bg-slate-50 rounded-lg p-4 shadow-md hover:cursor-pointer hover:shadow'
              : 'flex flex-col bg-slate-200 rounded-lg p-4 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg'
          }`}
          onClick={() => {
            handleTimer(0, shortBreak, 0)
            setTypeOfPomo('Short Break')
            clickSound()
          }}
        >
          <div className="flex gap-2">
            <RiTimerLine size={24} />
            <div className="font-mono font-bold">Short Break</div>
          </div>
          <div className=" flex justify-center text-2xl">{shortBreak}</div>
        </div>
        <div
          className={`${
            typeOfPomo === 'Long Break'
              ? 'flex flex-col bg-slate-50 rounded-lg p-4 shadow-md hover:cursor-pointer hover:shadow'
              : 'flex flex-col bg-slate-200 rounded-lg p-4 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg'
          }`}
          onClick={() => {
            handleTimer(0, longBreak, 0)
            setTypeOfPomo('Long Break')
            clickSound()
          }}
        >
          <div className="flex gap-2">
            <RiTimer2Line size={24} />
            <div className="font-mono font-bold">Long Break</div>
          </div>
          <div className="flex justify-center text-2xl">{longBreak}</div>
        </div>
      </div>
      <TimerComponent
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        flag={flag}
        typeOfPomo={typeOfPomo}
      />
    </>
  )
}

export default BreakComponent
