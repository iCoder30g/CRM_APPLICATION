import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const CreateTicketModal = ({
    newTicketModalVisible,
    closeNewTicketModal,
    createNewTicket,
    newTicket,
    handleNewTicketChange,
    setNewTicket,
}) => {
    return (
        <Modal
            show={newTicketModalVisible}
            onHide={closeNewTicketModal}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title >RAISE A NEW TICKET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={createNewTicket} >
                    <div className="p-1">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Title"
                                value={newTicket.title}
                                onChange={handleNewTicketChange}
                                required />
                        </div>
                        <div >
                            <textarea
                                id="form16"
                                className="md-textarea form-control" rows="3"
                                name="description"
                                placeholder="Description"
                                value={newTicket.description}
                                onChange={handleNewTicketChange}
                                required >
                            </textarea>
                        </div>
                    </div>
                    <div className="input-group justify-content-center">
                        <div className="m-1">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setNewTicket({
                                        title: "",
                                        description: "",
                                    });
                                    closeNewTicketModal();
                                }}
                            >Cancel</Button>
                        </div>
                        <div className="m-1">
                            <Button type="submit" variant="primary" >Create</Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTicketModal