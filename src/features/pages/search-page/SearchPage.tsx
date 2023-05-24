import classes from './SearchPage.module.scss';

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router';
import { useSearchInstrumentsQuery } from '../../../app/api/searchApi';
import { tabletBreakPoint } from '../../../shared/constants';
import { IconSearchWhite } from '../../../shared/icons';
import { debouncer } from '../../../utils/fnUtil';
import SmartInstrumentSummary from '../../components/smart/smart-instrument-summary/SmartInstrumentSummary';
import { SmartSearchResult } from '../../components/smart/smart-search-result/SmartSearchResult';
import LoadingBox from '../../../controls/loading-box/LoadingBox';

interface SearchPageProps { }
const SearchPage = (props: SearchPageProps) => {
  const { initialSearchTerm } = useParams();
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${tabletBreakPoint}px)` });
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(null as number | null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? '');
  const [searchDebounce, _] = useState(() => debouncer<string>(300, (searchTerm) => {
    setSearchTerm(searchTerm);
    window.history.replaceState(null, '', `/search/${searchTerm}`);
  }));

  const { isLoading: isLoadingSearchResults, isFetching: isFetchingSearchResults, data: searchedInstruments } = useSearchInstrumentsQuery({ searchTerm }, { skip: searchTerm.length === 0 });

  return <section className={`${classes.search} page rotate-root`}>
    {/* Search */}
    <div className="left">
      <div className="card">
        <h2 className={classes.header}>Instrument Search</h2>
        <div className={classes.bar}>
          <div className={classes.barIcon}>{IconSearchWhite}</div>
          <input
            className={classes.barInput}
            type="text"
            autoFocus
            placeholder='Search...'
            defaultValue={searchTerm}
            onChange={e => searchDebounce(e.target.value)}
          />
        </div>
      </div>

      {
        searchTerm.length > 0 &&
        <div className={`${classes.results}`}>
          {
            (isFetchingSearchResults || searchedInstruments == null)
              ? <div className={classes.resultWrapper}>
                <LoadingBox
                  content={<h3>Searching for instruments</h3>}
                  height={160}
                />
              </div>
              : searchedInstruments.length == 0
                ? <div className={`${classes.resultWrapper} card`}>
                  <h3>No instruments found for search term "{searchTerm}"</h3>
                </div>
                : searchedInstruments.map((instrument, idx) => {
                  return <div className={classes.resultWrapper} key={instrument.instrumentId}>
                    <SmartSearchResult
                      instrumentId={instrument.instrumentId}
                      isActive={instrument.instrumentId === selectedInstrumentId}
                      onClick={(instrumentId: number, ticker: string) => setSelectedInstrumentId(instrumentId)}
                      onTrade={(instrumentId: number, ticker: string) => navigate(`/trade/${ticker}`)}
                      onView={(instrumentId: number, ticker: string) => navigate(`/instrument/${ticker}`)}
                    />
                  </div>
                })
          }
        </div>
      }
    </div>

    {/* Summary */}
    {
      !isTabletOrMobile &&
      <div className="card right">
        {
          selectedInstrumentId == null
            ? <h3>Please select an instrument</h3>
            : <SmartInstrumentSummary
              instrumentId={selectedInstrumentId}
              displayChart={false}
              onView={(instrumentId, ticker) => navigate(`/instrument/${ticker}`)}
              onTrade={(instrumentId, ticker) => navigate(`/trade/${ticker}`)}
            />
        }
      </div>
    }
  </section>
}

export default SearchPage;