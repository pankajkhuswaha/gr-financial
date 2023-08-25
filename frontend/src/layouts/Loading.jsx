import { HashLoader } from "react-spinners";
const Loading = () => {

  const styles = {
    position: 'fixed', // Use 'fixed' instead of 'absolute'
    zIndex: 999,
    backgroundColor: '#74a4bf16',
    width: '100%',
    top: 0,
    left: 0, // Add 'left: 0' to ensure it spans the full width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Set minHeight to ensure it covers the entire viewport height
  };

  return (
    <div style={styles} className="flex-column gap-2 text-dark">
      <HashLoader color="#11cdef" />
      <p className="mt-4">Please wait Document is being uploading ....</p>
    </div>
  );
};

export default Loading;
