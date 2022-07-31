import { FunctionComponent } from 'react'

const AppBar: FunctionComponent = () => {
  return (
    <div className="divide-y">
      <div className="flex flex-row flex-wrap justify-between p-6 gap-10">
        <div>Pomodora</div>
        <div className="flex gap-8">
          <div>Settings</div>
          <div>Theme</div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default AppBar
