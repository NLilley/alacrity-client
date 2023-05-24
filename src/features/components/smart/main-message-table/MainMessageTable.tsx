import { useWebMessageThreadsQuery } from "../../../../app/api/webMessageApi";
import { WebMessageKind } from "../../../../app/enums/webMessageKind";
import LoadingBox from "../../../../controls/loading-box/LoadingBox";
import { WebMessageTable } from "../web-message-table/WebMessageTable";

export interface MainMessageTableProps {
  onClick?: (messageId: number, rootMessageId: number) => void,
}

export const MainMessageTable = (props: MainMessageTableProps) => {
  const { isLoading: isThreadsLoading, data: threads } = useWebMessageThreadsQuery({});
  if (isThreadsLoading || threads == null)
    return <LoadingBox />

  const mainMessageThreads = threads
    .filter(t => t.webMessages[0].messageKind !== WebMessageKind.SupportTicket);

  return <WebMessageTable
    webMessageThreads={mainMessageThreads}
    onClick={props.onClick}
  />;
}