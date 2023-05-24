import classes from './WebMessageTable.module.scss';
import { WebMessageThread } from "../../../../app/models/webMessage";
import Table from "../../../../controls/table/Table";
import { IconWatchlistWhite } from "../../../../shared/icons";
import { focusHandler } from '../../../../utils/accessibilityUtil';

export interface WebMessageTableProps {
  webMessageThreads: WebMessageThread[],
  onClick?: (messageId: number, rootMessageId: number) => void,
}

const header = ['', 'Date', 'Title', 'From', 'To'];
export const WebMessageTable = (props: WebMessageTableProps) => {
  const rows = props.webMessageThreads
    .map(t => {
      const latestMessage = t.webMessages[0];
      const earliestMessage = t.webMessages[t.webMessages.length - 1];

      return <tr
        key={latestMessage.rootMessageId}
        className="pointer"
        onKeyUp={focusHandler}
        onClick={() => props.onClick && props.onClick(latestMessage.webMessageId, latestMessage.rootMessageId)}
        tabIndex={0}
      >
        <td>{!latestMessage.read && <div className={classes.unread}>{IconWatchlistWhite}</div>}</td>
        <td>{new Date(latestMessage.createdDate).toLocaleString()}</td>
        <td>{earliestMessage.title}</td>
        <td>{earliestMessage.from}</td>
        <td>{earliestMessage.to}</td>
      </tr>
    });

  return <Table
    header={header}
    rows={rows}
    emptyMessage="No messages to display"
  />
}