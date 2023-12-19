import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/userContext";
import styles from "./Dashboard.module.css"; // Import your CSS module
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [newSlot, setNewSlot] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setTimeout(()=>{
      navigate("/");
  },1000)};

  const handleSlotChange = async () => {
    if (!newSlot) {
      toast.error("Please select desired slot");
      return;
    }

    if (user.slot === newSlot) {
      toast.error("New slot timing must be different from the current slot");
      return;
    }

    try {
      const response = await axios.put("/update", {
        userId: user._id, 
        updatedSlot: newSlot,
      });
      console.log(response);
      setUser(response.data);
      toast.success(`Your slot has been updated to ${newSlot} from next month`);
    } catch (error) {
      console.error("Error updating slot:", error);
      toast.success(`Your slot has been updated to ${newSlot} from next month`);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    if (!user ) {
      axios.get("/dashboard").then(({ data }) => {
        setUser(data);
      });
    }
  }, [user,setUser]);

  if (!user) {
    // Render loading state or redirect to login if user data is not available
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1>Welcome, {user.name}!</h1>
      <div className={styles.profileInfo}>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        <p>Contact: {user.contact}</p>
        <p>Gender: {user.gender}</p>
        <p>Current Slot: {user.slot}</p>
        <p>Updated Slot : {user.updated_slot}</p>
      </div>
      <div className={styles.slotChange}>
        <label htmlFor="newSlot">Change Slot Timing for Next Month:</label>
        <select
          id="newSlot"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
        >
          <option value="">Select Slot</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
        <button className={styles.slotChange} onClick={handleSlotChange}>Change Slot</button>
      </div>
      <div>
        <button className={styles.logoutbutton} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;