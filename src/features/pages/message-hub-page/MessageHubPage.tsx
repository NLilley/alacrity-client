import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router';
import Button from '../../../controls/button/Button';
import { tabletBreakPoint } from '../../../shared/constants';
import { MainMessageTable } from '../../components/smart/main-message-table/MainMessageTable';
import { SupportTicketTable } from '../../components/smart/support-ticket-table/SupportTicketTable';
import classes from './MessageHubPage.module.scss';
import { useSetMessageFinalizedMutation, useSetMessageReadMutation, useWebMessageThreadsQuery } from '../../../app/api/webMessageApi';
import WebMessageThread from '../../components/dumb/web-message-thread/WebMessageThread';
import LoadingBox from '../../../controls/loading-box/LoadingBox';

export interface MessageHubPageProps { }

const MessageHubPage = (props: MessageHubPageProps) => {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: `(max-width: ${tabletBreakPoint}px)` });
  const [selectedThreadId, setSelectedThreadId] = useState(null as number | null);
  const { isLoading: isThreadsLoading, data: threads } = useWebMessageThreadsQuery({});
  const [setMessageRead] = useSetMessageReadMutation();
  const [setMessageFinalized] = useSetMessageFinalizedMutation();

  if (isThreadsLoading || threads == null)
    return <div className="page">
      <LoadingBox height={300} />
    </div>;

  const selectedThread = threads.find(t => t.webMessages.find(w => w.rootMessageId === selectedThreadId));

  const onRowClick = (messageId: number, rootMessageId: number) => {
    const thread = threads.find(t => t.webMessages.find(w => w.webMessageId == messageId));
    const message = thread?.webMessages.find(w => w.webMessageId == messageId);
    if (message != null && !message.read)
      setMessageRead({ rootMessageId: rootMessageId, isRead: true });

    if (isTablet) {
      navigate(`/message/${rootMessageId}`);
    } else {
      setSelectedThreadId(rootMessageId);
      window.scrollTo(0, 0);
    }
  };

  return <section className={`page rotate-root`}>
    <div className="card left">
      <h2>Message Hub</h2>

      <div className="content">
        <h4>Support Tickets</h4>
        <SupportTicketTable onClick={onRowClick} />

        <div className={`${classes.actions}`}>
          <Button
            text='New Support Ticket'
            onClick={() => navigate('/new-message')}
            kind='sub'
            size='small'
          />
        </div>
      </div>

      <div className="content">
        <h4>Messages</h4>
        <MainMessageTable onClick={onRowClick} />
      </div>
    </div>

    {
      !isTablet && selectedThread == null
      && <div className="card right"><h3>Click a message to begin reading</h3></div>
    }

    {
      !isTablet && selectedThread != null
      && <div className="right">
        <WebMessageThread
          thread={selectedThread.webMessages}
          onArchive={(messageId: number, rootMessageId: number) => {
            setMessageFinalized({ rootMessageId: rootMessageId, isFinalized: true });
          }}
          onReply={(messageId: number, rootId: number) => {
            navigate(`/new-message/${rootId}`);
          }} />
      </div>
    }
  </section>;
};

export default MessageHubPage;