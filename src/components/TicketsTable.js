import React from 'react'
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';


const TicketsTable = ({ticketsList, editTicket, title}) => {
    return (
        <MaterialTable
            data={ticketsList}
            onRowClick={(event, rowData) => editTicket(rowData)}
            columns={[
                {
                    title: "TICKET ID",
                    field: "id",
                },
                {
                    title: "TITLE",
                    field: "title",

                },
                {
                    title: "DESCRIPTIONS",
                    field: "description",

                },
                {
                    title: "REPORTER",
                    field: "reporter",
                },
                {
                    title: "PRIORITY",
                    field: "ticketPriority",
                },
                {
                    title: "ASSIGNEE",
                    field: "assignee",
                },
                {
                    title: "STATUS",
                    field: "status",
                    lookup: {
                        "OPEN": "OPEN",
                        "IN_PROGRESS": "IN_PROGRESS",
                        "BLOCKED": "BLOCKED",
                        "CLOSED": "CLOSED"

                    },
                },
            ]}

            title={title}

            options={{
                // filtering: true,
                sorting: true,
                exportMenu: [{
                    label: 'Export PDF',
                    exportFunc: (cols, datas) => ExportPdf(cols, datas, 'TicketRecords')
                }, {
                    label: 'Export CSV',
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, 'TicketRecords')
                }],
                headerStyle: {
                    backgroundColor: "#081c3c",
                    color: '#FFF'
                },
                rowStyle: {
                    backgroundColor: "#183454",
                    color: "#fff",
                }
            }}

        />
    )
}

export default TicketsTable