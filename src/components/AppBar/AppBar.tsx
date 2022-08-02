import { FunctionComponent, useState } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { BiSun } from 'react-icons/bi'

interface Props {
  // eslint-disable-next-line no-unused-vars
  setTheme: (val: any) => void
  theme: 'light' | 'dark'
}

const AppBar: FunctionComponent<Props> = (props: Props) => {
  const { setTheme, theme } = props

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <div>
      <div className="flex flex-row flex-wrap justify-between p-6 gap-10">
        <div className="text-4xl tracking-widest font-extrabold font-mono text-slate-600 dark:text-slate-100">
          Pomodora
        </div>
        <div className="flex gap-8">
          <div
            className="m-auto hover:cursor-pointer dark:text-slate-50"
            onClick={handleTheme}
          >
            {theme === 'light' ? <FaRegMoon size={24} /> : <BiSun size={24} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar
