import {ResponsiveBar} from '@nivo/bar'
import React, {useContext} from "react";
import {ShiftTrendsContext} from "src/providers/ShiftTrendsContext";
import {addDays, endOfWeek, format, startOfWeek} from "date-fns";
import styles from "styles/analytics.module.css";

const PastTrendsVis: React.FunctionComponent = () => {
    const {currentDate, shiftTrends} = useContext(ShiftTrendsContext);
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    const visData = [];

    let day = startDate;
    while (day <= endDate) {
        const formattedDate = format(day, "yyyy-MM-dd");
        let data = shiftTrends[formattedDate];
        if (typeof data != 'undefined') {
            if ('message' in data) {
                data = {...data, shiftTime: 'N/A', cashTips: 0, creditCardTips: 0, hourlyWages: 0};
            }
            visData.push({...data, date: formattedDate});
        }
        day = addDays(day, 1);
    }

    const createBarGraph = () => {
        if (visData.length > 0) {
            let emptyData = 0;
            for (let i = 0; i < visData.length; i++) {
                if ('message' in visData[i]) {
                    emptyData += 1;
                }
            }
            return emptyData != 7 ? <ResponsiveBar
                data={visData}
                keys={['hourlyWages', 'cashTips', 'creditCardTips']}
                indexBy="date"
                margin={{top: 50, right: 130, bottom: 50, left: 60}}
                padding={0.3}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'nivo'}}
                borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Days Of The Week',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Earnings',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            /> : '';
        }
    }


    return (
        <div className={styles.pastTrendVisPosition}>
            {createBarGraph()}
        </div>
    );
};

export default PastTrendsVis;
