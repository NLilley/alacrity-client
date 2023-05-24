import classes from './Table.module.scss';

export interface TableProps {
  colGroup?: any,
  header: string[],
  rows: any[] | any[][],
  emptyMessage?: string,
  style?: any
}

const Table = (props: TableProps) => {
  let renderedRows: any;
  if (props.rows.length === 0) {
    renderedRows = <tr><td colSpan={props.header.length} className={classes.empty}>
      {props.emptyMessage ?? 'No data to display'}
    </td></tr>;
  }
  else if (props.rows[0].length > 0) {
    renderedRows = props.rows.map((row, idx) =>
      <tr key={idx}>
        {row.map((item: any, itemIdx: number) => <td key={itemIdx}>{item}</td>)}
      </tr>);
  }
  else {
    renderedRows = props.rows;
  }

  return <div className={classes.tableWrapper}>
    <table className={classes.table} style={props.style ?? {}}>
      {props.colGroup}
      <thead>
        <tr>
          {props.header.map((h, idx) => <th key={idx}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {renderedRows}
      </tbody>
    </table>
  </div>
}

export default Table;