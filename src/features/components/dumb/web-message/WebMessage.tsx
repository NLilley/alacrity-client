import classes from './WebMessage.module.scss';
import { useState } from 'react';
import { IconAccountWhite } from '../../../../shared/icons';

export interface WebMessageProps {
  date: Date,
  from: string,
  title: string,
  message: string,
  startCollapsed: boolean
}

const WebMessage = (props: WebMessageProps) => {
  const [isCollapsed, setIsCollapsed] = useState(props.startCollapsed);

  const isLongMessage = props.message.length > 300;
  const isFullyColapsed = isLongMessage && isCollapsed;

  return <div className={`${classes.webMessage}`}>
    <div className={classes.header}>
      <div className={classes.userIcon}>{IconAccountWhite}</div>
      <div className={classes.headerContent}>
        <div className={classes.from}>{props.from}</div>
        <div className={classes.date}>{props.date.toLocaleString()}</div>
      </div>
    </div>
    <div className={classes.title}>{props.title}</div>
    <div className={`${classes.body} ${isFullyColapsed ? classes.collapsed : ''}`}>
      {props.message}
    </div>
    {
      isLongMessage && <div className={classes.expandBox} onClick={() => setIsCollapsed(!isCollapsed)}>
        ...
      </div>
    }
  </div>;
}

export default WebMessage;