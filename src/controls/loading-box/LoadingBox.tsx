import classess from './LoadingBox.module.scss';

export interface LoadingBoxProps {
  width?: string | number,
  height?: string | number,
  content?: any
}

const LoadingBox = (props: LoadingBoxProps) => {
  const wrapperStyle = {} as any;
  if(props.width != null) wrapperStyle.width = props.width;
  if(props.height != null) wrapperStyle.height = props.height;

  return <div className={classess.loadingBoxWrapper} style={wrapperStyle}>
    {props.content}
  </div>;
}

export default LoadingBox;