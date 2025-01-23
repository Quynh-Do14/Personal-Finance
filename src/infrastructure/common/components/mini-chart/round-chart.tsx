type Props = {
  completed: number
  total: number
}
function RoundChartMiniCommon(props: Props) {
  const { completed, total } = props;
  const percentage = (completed / total) * 100

  return (
    <div className='flex flex-col items-center'>
      <div
        className='w-[120px] h-[120px] rounded-full bg-[#e5e7eb] relative'
        style={{
          background: `conic-gradient(#40BB15 ${percentage}%, #E5E7EB ${percentage}% 100%)`
        }}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-[16px] font-bold text-[#191919]'>
              {percentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoundChartMiniCommon
