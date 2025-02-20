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
        className='w-[140px] h-[140px] rounded-full bg-[#FFF] relative border-[#FFF] border-[2px]'
        style={{
          background: `conic-gradient(#40BB15 ${percentage}%, #FFF ${percentage}% 100%)`
        }}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-[12px] font-bold text-[#191919] bg-[#FFF] rounded-[50%] w-[44px] h-[44px] flex justify-center items-center'>
              {percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoundChartMiniCommon
