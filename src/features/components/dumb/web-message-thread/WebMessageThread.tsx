import classes from './WebMessageThread.module.scss';

import { default as WebMessageComponent } from "../web-message/WebMessage";
import { WebMessage } from '../../../../app/models/webMessage';
import Button from '../../../../controls/button/Button';

export interface MessageThreadProps {
  thread: WebMessage[],
  onReply?: (messageId: number, rootMessageId: number) => void,
  onArchive?: (messageId: number, rootMessageId: number) => void,
}

const WebMessageThread = (props: MessageThreadProps) => {
  if (props.thread.length == 0)
    return <div>
      There are no messages in this thread.
    </div>;

  const firstMessage = props.thread[0];
  const rest = props.thread.slice(1);

  const showActions = (!!props.onReply || !!props.onArchive) && !firstMessage.finalized;

  return <div>
    <div className={classes.webMessageWrapper}>
      <WebMessageComponent
        key={firstMessage.webMessageId}
        date={new Date(firstMessage.createdDate)}
        from={firstMessage.from}
        title={firstMessage.title}
        message={firstMessage.message}
        startCollapsed={false}
      />
    </div>

    {showActions &&
      <div className={classes.actions}>
        {
          props.onArchive &&
          <Button
            onClick={() => props.onArchive && props.onArchive(firstMessage.webMessageId ,firstMessage.rootMessageId)}
            text="Archive"
            kind='sub'
            size='small'
          />
        }
        {
          props.onReply &&
          <Button
            onClick={() => props.onReply && props.onReply(firstMessage.webMessageId, firstMessage.rootMessageId)}
            text="Reply"
            kind='sub'
            size='small'
          />
        }
      </div>
    }

    {rest.map(w =>
      <div
        className={classes.webMessageWrapper}
        key={w.webMessageId}
      >
        <WebMessageComponent
          date={new Date(w.createdDate)}
          from={w.from}
          title={w.title}
          message={w.message}
          startCollapsed
        />
      </div>)}
  </div>;
}

export default WebMessageThread;