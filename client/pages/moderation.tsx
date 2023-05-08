import Sidebar from '../components/Sidebar'
import ModerationDashboard from '../components/ModerationDashboard'

const style = {
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
    content: `max-w-[1400px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
}

const moderation = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon={'Moderation'} />
        <div className={`${style.mainContent} no-scrollbar`}>
            <ModerationDashboard />
        </div>
        {/* <Widgets /> */}
      </div>
    </div>
  )
}

export default moderation
