import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { USER_ROLES } from '../../constants/userRoles'


const UpdateTicketsModal = ({
    modalVisible,
    closeModal,
    updateSelectedTicket,
    selectedTicket,
    setSelectedTicket,
    handleTicketChange,
    userType,
    userList,
    userTypes,

}) => {
    return (
        <Modal
            show={modalVisible}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title >UPDATE TICKET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={updateSelectedTicket} >
                    <div className="p-1">
                        <h5 className="card-subtitle mb-2 text-primary lead">Ticket ID: {selectedTicket.id}</h5>
                        <hr />
                        <div className="input-group ">

                            {userType === USER_ROLES || USER_ROLES.ADMIN && (
                                <div className="input-group mb-2 ">
                                    <label className="label input-group-text label-md ">Title</label>
                                    <input type="text" className="form-control" name="title" value={selectedTicket.title} onChange={handleTicketChange} required />
                                </div>
                            )}

                            {userType === USER_ROLES.ADMIN && (
                                <div className="input-group mb-3">
                                    <label className="label input-group-text label-md ">Assignee</label>
                                    <select className="form-select" name="assignee" value={selectedTicket.assignee} onChange={handleTicketChange}>
                                         
                                        {
                                            userList.map((e, key) => {
                                                if (e.userTypes === "ENGINEER")
                                                    return <option key={key} value={e.value}>{e.userId}</option>;
                                                else
                                                    return undefined
                                            })
                                        }
                                        
                                    </select>
                                </div>
                            )}

                            <div className="input-group mb-2">
                                <label className="label input-group-text label-md ">Status</label>
                                <select className="form-select" name="status" value={selectedTicket.status} onChange={handleTicketChange}>
                                    <option value="OPEN">OPEN</option>
                                    <option value="CLOSED">CLOSED</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="BLOCKED">BLOCKED</option>
                                </select>
                            </div>

                            {userType === USER_ROLES.ENGINEER || USER_ROLES.ADMIN && (
                                <div className="input-group mb-3">
                                    <label className="label input-group-text label-md ">PRIORITY</label>
                                    <input type="number" className="form-control" name="ticketPriority" value={selectedTicket.ticketPriority} onChange={handleTicketChange} min="1" max="5" required /><p className="text-danger">*</p>
                                </div>
                            )}

                            {userType === USER_ROLES.CUSTOMER || USER_ROLES.ADMIN && (
                                <div className="input-group mb-2">
                                    <textarea id="form16" className="form-control " rows="3" name="description" placeholder="Description" value={selectedTicket.description} onChange={handleTicketChange} required></textarea>
                                </div>
                            )}

                            <div className="input-group justify-content-center">
                                <div className="m-1">
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setSelectedTicket({})
                                            closeModal()
                                        }}
                                    >Cancel</Button>
                                </div>
                                <div className="m-1">
                                    <Button type="submit" variant="primary" >Update</Button>
                                </div>
                            </div>

                        </div>
                    </div>



                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>


        </Modal>
    )
}

export default UpdateTicketsModal