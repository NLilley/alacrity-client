import { useNavigate, useParams } from "react-router";
import { useSetMessageFinalizedMutation, useWebMessageThreadsQuery } from "../../../app/api/webMessageApi";
import WebMessageThread from "../../components/dumb/web-message-thread/WebMessageThread";
import LoadingBox from "../../../controls/loading-box/LoadingBox";

export interface MessagePageProps { }

const MessagePage = (props: MessagePageProps) => {
  const { rootId: rootIdStr } = useParams();
  const navigate = useNavigate();
  const { isLoading: isThreadsLoading, data: threads } = useWebMessageThreadsQuery({});
  const [setMessageFinalized] = useSetMessageFinalizedMutation();

  if (isThreadsLoading || threads == null)
    return <section className="page">
      <LoadingBox height={400} />
    </section>;

  const rootId = parseInt(rootIdStr ?? '', 10);
  const thread = threads.find(t => t.webMessages[0].rootMessageId === rootId);

  if (thread == null)
    return <section className="page">
      <div className="card">
        Error Loading Thread
      </div>
    </section>;

  return <section className="page rotate-root">
    <div className="card left">
      <WebMessageThread
        thread={thread.webMessages}
        onArchive={(messageId: number, rootMessageid: number) => {
          setMessageFinalized({ rootMessageId: messageId, isFinalized: true });
          setMessageFinalized({ rootMessageId: rootMessageid, isFinalized: true });
        }}
        onReply={(messageId: number, rootId: number) => {
          navigate(`/new-message/${rootId}`);
        }}
      />
    </div>
  </section>
}

export default MessagePage;