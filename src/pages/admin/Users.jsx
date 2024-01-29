import { useEffect, useState } from "react";
import client from "../../config/client";
import Table from "../../components/Table";
import FeatureLoader from "../../components/FeatureLoader";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    { name: "Name", selector: (row) => row.name },

    { name: "Email", selector: (row) => row.email },
    { name: "Phone Number", selector: (row) => row.phoneNumber },
    {
      name: "Shipping Address",
      selector: (row) => row.shippingAddress,
    },
  ];
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await client.get("user");

      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="font-montserrat">
      <div className="">
        <h2 className=" font-bold text-2xl">All Users</h2>
      </div>
      {loading ? (
        <FeatureLoader text="Fetching Users" />
      ) : (
        <Table tableHeaders={columns} tableDetails={users} />
      )}
    </div>
  );
}

export default Users;
