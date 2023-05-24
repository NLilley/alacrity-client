import classes from './NotImplementedPage.module.scss';

export interface NotImplementedPageProps {}

const NotImplementedPage = (props: NotImplementedPageProps) => {
  return <section className={`page ${classes.notImplemented}`}>
    <div className="card">
        <h2>Page intentionally left blank in the interest of expediency!</h2>
        <div>
          There's only so much time availble to dedicate to side projects,
          and I've not been able to finish implementing this feature yet.
        </div>
        <div>
          Sorry if you're heart broken! 💔
        </div>
    </div>
  </section>
}

export default NotImplementedPage;