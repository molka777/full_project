import React from 'react'
import {
    Badge,
    Media,
    Progress,

    UncontrolledTooltip,
} from "reactstrap";

const User = ({ user }) => {
    return (
        <>
            <tbody>
                <tr>
                    <th scope="row">
                        <Media className="align-items-center">
                            <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                {/* <img
                                                alt="..."
                                                src={
                                                    require("../../assets/img/theme/bootstrap.jpg")
                                                        .default
                                                }
                                            /> */}
                            </a>
                            <Media>
                                <span className="mb-0 text-sm">
                                    {user._id}
                                </span>
                            </Media>
                        </Media>
                    </th>
                    <td>{user.name}</td>
                    <td>
                        <Badge color="" className="badge-dot mr-3">
                            <i className="bg-warning" />
                        </Badge>
                        {user.role}
                    </td>
                    <td>
                        <div className="avatar-group">
                            {user.phoneNumber}
                        </div>
                    </td>

                    <td>
                        <div className="d-flex align-items-center">
                            <span className="mr-20">{user.email}</span>

                        </div>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

export default User
