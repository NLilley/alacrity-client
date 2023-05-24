import { IChartApi, ISeriesApi, Time, createChart } from 'lightweight-charts';
import { Candle } from '../app/models/candle';

export interface LWCCandle {
  open: number,
  high: number,
  low: number,
  close: number,
  time: Time
}
// https://tradingview.github.io/lightweight-charts/docs/time-zones
export const convertToLWCDateTimeFormat = (dt: Date): Time => {
  return Date.UTC(
    dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()
  ) / 1000 as Time;
}
export const convertCandleToLWC = (candle: Candle) => ({
  time: convertToLWCDateTimeFormat((new Date(candle.date as any))),
  open: candle.open,
  high: candle.high,
  low: candle.low,
  close: candle.close

});

export class ChartUtil {
  public static setupCandlesticks(ele: any, data: Candle[]): [IChartApi, ISeriesApi<"Candlestick">] {
    const parentBounds = ele.parentElement.getBoundingClientRect();
    const chart = createChart(
      ele,
      {
        width: parentBounds.width,
        height: 500,
        leftPriceScale: {
          borderColor: '#333',
          autoScale: true,
        },
        rightPriceScale: {
          borderColor: '#333',
          autoScale: true,

        },
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
          borderColor: '#333',
          visible: true,
          borderVisible: false,
        },
        watermark: {
          text: 'Alacrity',
          color: '#202020',
          fontFamily: 'Outfit',
          vertAlign: 'bottom',
          horzAlign: 'right',
          visible: true,
        },
        overlayPriceScales: {},
        layout: {
          background: { color: 'transparent', },
          textColor: '#f8f8f8',
          fontFamily: 'Outfit',
        },
        grid: {
          vertLines: { color: '#333' },
          horzLines: { color: '#333' }
        },
        crosshair: {
          mode: 0
        }
      }
    );

    const winColor = '#15aa2e';
    const loseColor = '#bc2623';

    const candleSeries = chart.addCandlestickSeries({
      upColor: winColor,
      wickUpColor: winColor,
      borderUpColor: winColor,
      downColor: loseColor,
      wickDownColor: loseColor,
      borderDownColor: loseColor,
      borderColor: 'transparent',
    });

    const lwcCandles: LWCCandle[] = data.map(convertCandleToLWC);
    candleSeries.setData(lwcCandles);

    chart.timeScale().setVisibleLogicalRange({ from: data.length - 50, to: data.length });

    return [chart, candleSeries];
  }
}