import { useWebMessageThreadsQuery } from "../../../../app/api/webMessageApi";
import { WebMessageKind } from "../../../../app/enums/webMessageKind";
import LoadingBox from "../../../../controls/loading-box/LoadingBox";
import { WebMessageTable } from "../web-message-table/WebMessageTable";

export interface SupportTicketTableProps {
  onClick?: (messageId: number, rootMessageId: number) => void,
}

export const SupportTicketTable = (props: SupportTicketTableProps) => {
  const { isLoading: isThreadsLoading, data: threads } = useWebMessageThreadsQuery({});
  if (isThreadsLoading || threads == null)
    return <LoadingBox height={300}/>;

  const supportTicketThreads = threads
    .filter(t => t.webMessages[0].messageKind === WebMessageKind.SupportTicket);

  return <WebMessageTable
    webMessageThreads={supportTicketThreads}
    onClick={props.onClick}
  />;
}