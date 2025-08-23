import "./Simple.css";

const Profile = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Profile</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="Name" />
                </div>
                <div className="input">
                    <input type="text" placeholder="Email" />
                </div>
                <div className="input">
                    <input type="text" placeholder="Phone" />
                </div>
                <div className="input">
                    <input type="text" placeholder="Address" />
                </div>
                <div className="submit-container">
                    <div className="submit">Update</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
