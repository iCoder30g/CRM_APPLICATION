import SingleStatusCard from "./SingleStatusCard"




const StatusCards = (props) => {

    const { ticketsCount } = props;

    return (
        <div className="row my-5 mx-3 text-center">

            <SingleStatusCard
                count={ticketsCount.open}
                statusName="Open"
                icon={<i className="bi bi-pencil text-primary mx-2"></i>}
                colorScheme="primary"
                textColor="red"
                pathColor="darkblue"
            />

            <SingleStatusCard
                count={ticketsCount.progress}
                statusName="Progress"
                icon={<i className="bi bi-lightning-charge text-warning mx-2"></i>}
                colorScheme="warning"
                textColor="red"
                pathColor="darkgoldenrod"
            />

            <SingleStatusCard
                count={ticketsCount.closed}
                statusName="Closed"
                icon={<i className="bi bi-check2-circle text-success mx-2"></i>}
                colorScheme="success"
                textColor="red"
                pathColor="darkolivegreen"
            />

            <SingleStatusCard
                count={ticketsCount.blocked}
                statusName="Blocked"
                icon={<i className="bi bi-slash-circle text-secondary mx-2"></i>}
                colorScheme="secondary"
                textColor="red"
                pathColor="black"
            />

        </div>
    )
}


export default StatusCards;