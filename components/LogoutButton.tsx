export default function LogoutButton() {
  return (
    <form action='/auth/sign-out' method='post'>
      <button
        style={{
          backgroundColor: "#322f2f",
          padding: "10px",
          fontSize: "16px",
          color: "white",
          cursor: "pointer",
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
          border: "none",
        }}
      >
        Logout
      </button>
    </form>
  );
}
