import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegistrationNotif({ user }) {
  const hasNotified = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "ADMIN" && !hasNotified.current) {
      toast.info("Pending account registrations. See Approvals tab.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        style: { backgroundColor: "#fff", color: "#333" },
        closeOnClick: true,
        pauseOnHover: true,
        onClick: () => navigate("/approvals"),
      });
      hasNotified.current = true;
    }
  }, [user, navigate]);

  return null;
}

export default RegistrationNotif;
