import MessengerLayout from "./components/MessengerLayout/MessengerLayout";
import RefreshCurrentUser from "./shared/RefreshCurrentUser/RefreshCurrentUser";

const page = () => {
  return (
    <div>
      <RefreshCurrentUser />

      <MessengerLayout />
    </div>
  );
};

export default page;
