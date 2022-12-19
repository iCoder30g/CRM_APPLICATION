import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar"
import Footer from '../components/Footer';
import { fetchCreatedTickets, saveExistingTicket } from '../api/tickets';
import { getTicketsCount } from '../utils/ticketCount.js';
import TicketsTable from '../components/TicketsTable';
import UpdateTicketsModal from '../components/Modals/UpdateTicketsModal';
import StatusCards from '../components/StatusCards_2';

import "../styles/engineer.css"

const logoutFn = () => {
    localStorage.clear();
    window.location.href = "/"
}



function Engineer() {

    const [ticketsList, setTicketsList] = useState([]);
    const [ticketsCount, setTicketsCount] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");


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


    useEffect(() => {
        fetchTicketsList();
    }, []);



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
                    if (error.status === 400)
                        setMessage(error.message);
                    else if (error.response.status === 401) {
                        logoutFn()
                        setMessage("Authorization error, retry loging in");
                    }
                    closeModal();
                    console.log(error.message);
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



    return (
        <div className="backGround  min-vh-100 ">
            <div className="col-1">
                <Sidebar home='/' />
            </div>

            <div className='container'>
                <h1 className="text-primary text-center">Welcome, {localStorage.getItem("name")}</h1>
                <p className="text-muted text-center">Take a quick looks at your admin stats below. </p>


                {/**card starts here */}
                <div className='mx-5'>
                    <StatusCards ticketsCount={ticketsCount} />
                </div>
                {/**card ends here */}

                <hr />
                <p className="text-success">{message}</p>

                {/**Material Table starts here */}

                <div className="mx-5">
                    <TicketsTable
                        ticketsList={ticketsList}
                        editTicket={editTicket}
                        title="Tickets Assigned To You"
                    />
                </div>

                {/**Material Table ends here */}



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

export default Engineer;