import React from 'react'
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';


const UserListTable = ({userList, fetchUsers}) => {
  return (
    <MaterialTable
                    onRowClick={(event, rowData) => fetchUsers(rowData.userId)}
                    title="USER RECORDS"
                    data={userList}
                    columns={[
                        {
                            title: "USER ID",
                            field: "userId",
                        },
                        {
                            title: "NAME",
                            field: "name",

                        },
                        {
                            title: "EMAIL",
                            field: "email",

                        },
                        {
                            title: "ROLE",
                            field: "userTypes",
                            lookup: {
                                "ADMIN": "ADMIN",
                                "CUSTOMER": "CUSTOMER",
                                "ENGINEER": "ENGINEER",

                            },
                        },
                        {
                            title: "STATUS",
                            field: "userStatus",
                            lookup: {
                                "APPROVED": "APPROVED",
                                "PENDING": "PENDING",
                                "REJECTED": "REJECTED",

                            },
                        },
                    ]}
                    options={{
                        // filtering: true,
                        sorting: true,
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'UserRecords')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
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

export default UserListTable