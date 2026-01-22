import "../styles/AttendanceLoader.css";

function AttendanceLoader() {
  return (
    <div className="loader">
      <div className="loader-content">
        <div className="spinner"></div>
        <p className="loader-text">Saving...</p>
      </div>
    </div>
  );
}

export default AttendanceLoader;
