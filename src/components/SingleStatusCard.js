import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';




const SingleStatusCard = (props) => {
    const { count, statusName, icon, colorScheme, textColor, pathColor } = props;

    return (
        <div className="col-xs-12 col-lg-3 col-md-6 my-1 ">
            <div className={`card  cardItem shadow  bg-${colorScheme} text-dark bg-opacity-25 borders-b`} style={{ width: 15 + 'rem' }}>
                <div className="card-body">
                    <h5 className="card-subtitle mb-2">
                        {icon}
                        {statusName}
                    </h5>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h1 className={`col text-${colorScheme} mx-4`}>{count}</h1>
                        </div>
                        <div className="col">
                            <div style={{ width: 40, height: 40 }}>
                                <CircularProgressbar value={count} styles={buildStyles({
                                    textColor,
                                    pathColor,
                                })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SingleStatusCard;