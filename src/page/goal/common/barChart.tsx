import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2'
type Props = {
    statisticsByTime: any
}
const BarChartStatic = (props: Props) => {
    const {
        statisticsByTime,
    } = props;

    const barChartData = {
        labels: Array.from({ length: 7 }, (_, i) => dayjs().subtract(6 - i, 'day').format('DD/MM')),
        datasets: [
            {
                label: 'Thu',
                data: [1500000, 2000000, 1800000, 2200000, 2500000, 1700000, 1900000],
                backgroundColor: '#006699',
                barThickness: 20,
                borderRadius: 10,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
            },
            {
                label: 'Chi',
                data: [1000000, 1200000, 900000, 1100000, 1500000, 1300000, 1400000],
                backgroundColor: '#006633',
                barThickness: 20,
                borderRadius: 10,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
            },
        ],
    };

    return (
        <div className='bar-chart box-common'>
            <p className='title-box'>Biểu đồ thu chi</p>
            <Bar
                data={statisticsByTime}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: true },
                        title: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            display: true,
                            beginAtZero: true,
                            ticks: {
                                stepSize: 500000
                            }
                        }
                    },
                }}
            />
        </div>
    )
}

export default BarChartStatic