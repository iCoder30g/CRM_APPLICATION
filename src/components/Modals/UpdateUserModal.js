import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { USER_ROLES } from '../../constants/userRoles'

const UpdateUserModal = ({
    userModal,
    closeUserModal,
    updateUserDetail,
    userDetail,
    changeUserDetail,

}) => {
    return (
        <Modal
            show={userModal}
            onHide={closeUserModal}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title >Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={updateUserDetail} >

                    <div className="p-1">
                        <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                        <hr />
                        <div className="input-group mb-3">
                            <label className="label input-group-text label-md ">Name</label>
                            <input type="text" className="form-control" name="name" value={userDetail.name} onChange={changeUserDetail} />

                        </div>
                        <div className="input-group mb-3">
                            <label className="label input-group-text label-md ">Email</label>
                            <input type="text" className="form-control" name="name" value={userDetail.email} onChange={changeUserDetail} disabled />

                        </div>

                        <div className="input-group mb-3">
                            <label className="label input-group-text label-md ">Type</label>
                            <select className="form-select" name="type" value={userDetail.userTypes} onChange={changeUserDetail}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="CUSTOMER">CUSTOMER</option>
                                <option value="ENGINEER">ENGINEER</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <label className="label input-group-text label-md ">Status</label>
                            <select name="status" className="form-select"
                                value={userDetail.userStatus} onChange={changeUserDetail}>
                                <option value="APPROVED">APPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                                <option value="PENDING">PENDING</option>
                            </select>

                        </div>

                    </div>
                    <div className="input-group justify-content-center">
                        <div className="m-1">
                            <Button variant="secondary" onClick={() => closeUserModal()}>
                                Close
                            </Button>
                        </div>
                        <div className="m-1">
                            <Button variant="primary" onClick={() => updateUserDetail()}>Update</Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateUserModal;