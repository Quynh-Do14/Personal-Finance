import { Bar } from 'react-chartjs-2'
type Props = {
    barChartData: any
}
const BarChartStatic = (props: Props) => {
    const {
        barChartData,
    } = props;

    return (
        <div className='bar-chart'>
            <Bar
                data={barChartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            display: false,
                            beginAtZero: true,
                            ticks: {
                                stepSize: 500000
                            }
                        }
                    },
                }}
            />
            <p>Thống kê thu nhập/ chi phí</p>
        </div>
    )
}

export default BarChartStatic