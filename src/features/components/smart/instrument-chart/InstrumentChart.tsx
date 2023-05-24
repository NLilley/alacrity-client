import { IChartApi, ISeriesApi, Time } from 'lightweight-charts';
import { usePriceHistoryPastPeriodQuery, usePriceHistoryQuery } from '../../../../app/api/priceHistoryApi';
import { CandleTimePeriod } from '../../../../app/enums/priceHistory/candleTimePeriod';
import { useInstrumentPrice } from '../../../../app/hooks';
import Chart from '../../dumb/chart/Chart';
import { LWCCandle, ChartUtil, convertToLWCDateTimeFormat } from '../../../../utils/chartUtil';
import { useState } from 'react';
import LoadingBox from '../../../../controls/loading-box/LoadingBox';

export interface TickerChartProps {
  instrumentId?: number
}

const InstrumentChart = (props: TickerChartProps) => {
  const [candleSeries, setCandleSeries] = useState(null as ISeriesApi<"Candlestick"> | null);
  const [workingCandle, setWorkingCandle] = useState({
    time: 0, open: 0, high: 0, low: 0, close: 0
  } as LWCCandle);
  const { isFetching: isFetchingPriceData, data: priceHistoryData } = usePriceHistoryPastPeriodQuery({
    instrumentId: props.instrumentId,
    seconds: 60 * 60 * 2,
    candleTimePeriod: CandleTimePeriod.Secs5,
  }, { refetchOnMountOrArgChange: true });
  const price = useInstrumentPrice(props.instrumentId);

  if (isFetchingPriceData == true || props.instrumentId == null || priceHistoryData == null) {
    return <LoadingBox height={400} />;
  }

  if (candleSeries != null && price != null) {
    const mid = price.mid!;

    const convertedTime = convertToLWCDateTimeFormat(new Date());
    const nowRounded = Math.floor(convertedTime as number / 5) * 5 as Time;

    if (workingCandle.time === 0 || workingCandle.time !== nowRounded) {
      workingCandle.time = nowRounded;
      workingCandle.open = mid;
      workingCandle.high = mid;
      workingCandle.low = mid;
      workingCandle.close = mid;
    }
    else {
      if (workingCandle.low > mid) workingCandle.low = mid;
      if (workingCandle.high < mid) workingCandle.high = mid;
      workingCandle.close = mid;
    }

    try {
      candleSeries?.update(workingCandle);
    }
    catch (ex) {
      console.error(ex);
    }
  }

  let chart = null as IChartApi | null;

  return <Chart
    key={props.instrumentId}
    onStart={ele => {
      const [newChart, candleSeries] = ChartUtil.setupCandlesticks(ele, priceHistoryData)
      chart = newChart;
      setCandleSeries(candleSeries);
    }}
    onEnd={() => {
      setWorkingCandle({
        time: 0, open: 0, high: 0, low: 0, close: 0
      } as LWCCandle);
      chart?.remove();
    }}
  />
};

export default InstrumentChart;