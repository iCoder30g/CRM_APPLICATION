import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar"
import Footer from '../components/Footer';
import { fetchCreatedTickets, saveExistingTicket } from '../api/tickets';
import { getAllUser, updateUserData } from '../api/user';
import { getTicketsCount } from '../utils/ticketCount.js';
import TicketsTable from '../components/TicketsTable';
import UpdateTicketsModal from '../components/Modals/UpdateTicketsModal';
import StatusCards from '../components/StatusCards_2';
import UpdateUserModal from '../components/Modals/UpdateUserModal';
import UserListTable from '../components/UserListTable';

import "../styles/admin.css"
import "../styles/common.css"

const logoutFn = () => {
    localStorage.clear();
    window.location.href = "/"
}

function Admin() {
    {/**for users starts */ }
    const [userList, setUserList] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [userModal, setUserModal] = useState(false);
    const showUserModal = () => setUserModal(true);
    const closeUserModal = () => {
        setUserModal(false);
        setUserDetail({});
    }

    {/**for users endss */ }

    const [ticketsList, setTicketsList] = useState([]);
    const [ticketsCount, setTicketsCount] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");




    {/**users starts */ }
    const fetchUsers = (userId) => {
        getAllUser(userId).then(function (response) {
            if (response.status === 200) {
                if (userId) {
                    setUserDetail(response.data[0])
                    showUserModal()
                }
                else
                    setUserList(response.data);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateUserDetail = () => {
        const data = {
            "userType": userDetail.userTypes,
            "userStatus": userDetail.userStatus,
            "userName": userDetail.name
        }
        updateUserData(userDetail.userId, data)
            .then(function (response) {
                if (response.status === 200) {
                    setMessage(response.message);
                    let idx = userList.findIndex((obj => obj.userId === userDetail.userId));
                    userList[idx] = userDetail
                    closeUserModal();
                    setMessage("User detail updated successfully");
                }
            })
            .catch(function (error) {
                if (error.status === 400)
                    setMessage(error.message);
                else if (error.response.status === 401) {
                    logoutFn();
                }
                else
                    console.log(error);
            });
    }

    const changeUserDetail = (e) => {
        if (e.target.name === "status")
            userDetail.userStatus = e.target.value
        else if (e.target.name === "name")
            userDetail.name = e.target.value
        else if (e.target.name === "type")
            userDetail.userTypes = e.target.value
        setUserDetail(userDetail)
        setUserModal(e.target.value);
    }

    {/**users ends */ }


    {/**Tickets starts */ }

    const closeModal = () => {
        setModalVisible(false);
    }

    const openModal = () => {
        setModalVisible(true);
    }

    const fetchTicketsList = () => {
        fetchCreatedTickets()
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    const tickets = res.data;
                    setTicketsList(tickets);
                    const countMap = getTicketsCount(tickets);
                    setTicketsCount(countMap)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const editTicket = (rowData) => {
        const ticket = { ...rowData };
        setSelectedTicket(ticket);
        openModal();
    }

    const updateSelectedTicket = (e) => {
        // api call for updating the edited ticket
        saveExistingTicket(selectedTicket.id, selectedTicket)
            .then((res) => {
                if (res.status === 200) {
                    setMessage("Ticket Updated Successfully");
                    // fetch ticket list again to show
                    fetchTicketsList();
                    closeModal();
                }
            }).catch(function (error) {
                if (error.response.status === 400)
                    setMessage(error.message);
                else if (error.response.status === 401)
                    logoutFn();
                else
                    console.log(error);
            })
        e.preventDefault();
    }

    const handleTicketChange = (e) => {
        const updatedTicket = { ...selectedTicket }

        if (e.target.name === "title")
            updatedTicket.title = e.target.value
        else if (e.target.name === "description")
            updatedTicket.description = e.target.value
        else if (e.target.name === "status")
            updatedTicket.status = e.target.value
        else if (e.target.name === "assignee")
            updatedTicket.assignee = e.target.value
        else if (e.target.name === "ticketPriority")
            updatedTicket.ticketPriority = e.target.value

        setSelectedTicket(updatedTicket);
    };

    {/**Tickets ends */ }


    useEffect(() => {
        fetchUsers("")
        fetchTicketsList();
    }, []);



    return (
        <div className=" background min-vh-100 ">
            <div className="col-1">
                <Sidebar home='/' />
            </div>

            <div className='container'>
                <h1 className="text-primary text-center">Welcome, {localStorage.getItem("name")}</h1>
                <p className="text-muted text-center color-white">Take a quick looks at your admin stats below. </p>


                {/**card starts here */}
                <div className="mx-5">
                    <StatusCards ticketsCount={ticketsCount} />
                </div>
                {/**card ends here */}

                <hr />
                <div className="text-success">{message.includes("User") ? message : ""}</div>

                {/** User List material table starts here */}

                <div className="mx-5">
                    <UserListTable
                        userList={userList}
                        fetchUsers={fetchUsers}
                    />
                </div>

                {/** User List material table ends here */}


                <hr />
                <div className="text-success">{message.includes("Ticke") ? message : ""}</div>


                {/** Tickets Material Table starts here */}

                <div className="mx-5">
                    <TicketsTable
                        ticketsList={ticketsList}
                        editTicket={editTicket}
                        title="ALL TICKETS"
                    />
                </div>

                {/** Tickets Material Table ends here */}


                {/** update user modal starts here */}

                {userModal && (
                    <UpdateUserModal
                        userModal={userModal}
                        closeUserModal={closeUserModal}
                        updateUserDetail={updateUserDetail}
                        userDetail={userDetail}
                        changeUserDetail={changeUserDetail}
                    />
                )}

                {/** update user modal ends here */}


                {/** Update Tickets modal starts here  */}

                {modalVisible && (
                    <UpdateTicketsModal
                        modalVisible={modalVisible}
                        closeModal={closeModal}
                        updateSelectedTicket={updateSelectedTicket}
                        selectedTicket={selectedTicket}
                        setSelectedTicket={setSelectedTicket}
                        handleTicketChange={handleTicketChange}
                        userType={localStorage.getItem("userTypes")}
                        userList={userList}
                    />
                )}

                {/** Update Tickets modal ends here  */}

            </div>

            <div>
                <Footer />
            </div>

        </div>
    )
}

export default Admin;