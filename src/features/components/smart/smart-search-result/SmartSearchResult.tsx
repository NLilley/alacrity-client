import { useInstrumentQuery } from "../../../../app/api/instrumentsApi";
import { useInstrumentPrice } from "../../../../app/hooks";
import LoadingBox from "../../../../controls/loading-box/LoadingBox";
import SearchResult from "../../dumb/search-result/SearchResult";

export interface SmartSearchResultProps {
  instrumentId: number,
  isActive: boolean,
  onClick: (instrumentId: number, ticker: string) => void,
  onView: (instrumentId: number, ticker: string) => void,
  onTrade: (instrumentId: number, ticker: string) => void
}

export const SmartSearchResult = (props: SmartSearchResultProps) => {
  const { isLoading: isInstrumentLoading, data: instrument } = useInstrumentQuery({ instrumentId: props.instrumentId });
  const instrumentPrice = useInstrumentPrice(props.instrumentId);

  return (isInstrumentLoading || instrument == null)
    ? <LoadingBox height={200} />
    : <SearchResult
      name={instrument.name}
      ticker={instrument.ticker}
      industry={instrument.sector}
      price={instrumentPrice?.mid}
      prevClose={instrument.previousClose}
      icon={instrument.iconPath}
      isActive={props.isActive}
      onClick={() => props.onClick(instrument.instrumentId, instrument.ticker)}
      onView={() => props.onView(instrument.instrumentId, instrument.ticker)}
      onTrade={() => props.onTrade(instrument.instrumentId, instrument.ticker)}
    />
}