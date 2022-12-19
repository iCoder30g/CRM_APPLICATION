import SingleStatusCard from "./SingleStatusCard"




const StatusCards = (props) => {

    const { ticketsCount } = props;


    const cardArr = [
        {
            count: ticketsCount.open,
            statusName: "Open",
            icon: <i className="bi bi-pencil text-primary mx-2"></i>,
            colorScheme: "primary",
            textColor: "red",
            pathColor: "darkblue"
        },
        {
            count: ticketsCount.progress,
            statusName: "Progress",
            icon: <i className="bi bi-lightning-charge text-warning mx-2"></i>,
            colorScheme: "warning",
            textColor: "red",
            pathColor: "darkgoldenrod"
        },
        {
            count: ticketsCount.closed,
            statusName: "Closed",
            icon: <i className="bi bi-check2-circle text-success mx-2"></i>,
            colorScheme: "success",
            textColor: "red",
            pathColor: "darkolivegreen"
        },
        {
            count: ticketsCount.blocked,
            statusName: "Blocked",
            icon: <i className="bi bi-slash-circle text-secondary mx-2"></i>,
            colorScheme: "secondary",
            textColor: "red",
            pathColor: "black"
        },
    ];

    return (
        <div className="row my-5 mx-2 text-center">

            {cardArr.map(card => {
                const { count, statusName, icon, colorScheme, textColor, pathColor } = card;

                return (
                    <SingleStatusCard
                        count={count}
                        key="statusName"
                        statusName={statusName}
                        icon={icon}
                        colorScheme={colorScheme}
                        textColor={textColor}
                        pathColor={pathColor}
                    />
                );
            })}



        </div>
    );
};


export default StatusCards;