import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSubmitMessageMutation, useWebMessageThreadsQuery } from "../../../app/api/webMessageApi";
import Button from "../../../controls/button/Button";
import TextArea from "../../../controls/text-area/TextArea";
import TextInput from "../../../controls/text-input/TextInput";
import classes from './NewMessagePage.module.scss';
import { WebMessageThread } from "../../../app/models/webMessage";
import LoadingBox from "../../../controls/loading-box/LoadingBox";

export interface NewWebMessagePageProps { }

const NewWebMessagePage = (props: NewWebMessagePageProps) => {
  const navigate = useNavigate();
  const { rootId: rootMessageIdStr } = useParams();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const { isLoading: isWebMessagesLoading, data: threads } = useWebMessageThreadsQuery({});
  const [attemptSubmitMessage, submitMessageStatus] = useSubmitMessageMutation();

  if (isWebMessagesLoading == true || threads == null)
    return <section className="page">
      <LoadingBox height={400} />
    </section>;

  const rootId = parseInt(rootMessageIdStr ?? '-1', 10);
  const thread = threads.find((t: WebMessageThread) => t.webMessages[0].rootMessageId == rootId);

  if (rootId !== -1 && thread == null)
    return <div className="card">
      Error: Unable to reply, as we could not find the web message thread.
    </div>;

  const isNew = thread == null;

  const disableSubmit =
    (isNew && title.length == 0)
    || message.length == 0
    || submitMessageStatus.isLoading;

  const latestMessage = thread?.webMessages[0];

  if (latestMessage?.finalized)
    return <section className="card">
      This thread has been archived.
      To request help with an issue, please create a new Support ticket by emailing support@alacrity.com.
    </section>;

  return <section className="page rotate-root">
    <div className={`${classes.newMessage} card`}>
      <h2>{isNew ? "New Ticket" : "Reply to Ticket"}</h2>

      <TextInput
        label="To"
        value="Alacrity Support"
        disabled
      />
      {
        isNew
          ? <TextInput
            label="Title"
            placeholder="New Message Title"
            value={title}
            autoFocus
            onChange={t => setTitle(t)}
          />
          : <TextInput
            label="Title"
            placeholder="Replying To"
            value={latestMessage?.title}
            autoFocus
            disabled
          />
      }

      <TextArea
        label="Your Message"
        value={message}
        onChange={m => setMessage(m)}
        style={{ minHeight: 280 }}
      />

      <div className="card-footer">
        <Button
          text="Submit"
          onClick={() => {
            attemptSubmitMessage({
              rootMessageId: isNew ? undefined : rootId,
              title: isNew ? title : undefined,
              message: message,
            }).then(res => {
              if ("error" in res)
                return;

              navigate('/message-hub');
            });
          }}
          kind="main"
          size="small"
          disabled={disableSubmit}
        />
      </div>
    </div>

  </section>
}

export default NewWebMessagePage;