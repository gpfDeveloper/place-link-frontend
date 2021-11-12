import UserList from "../components/users/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Pengfei",
      image: "https://avatars.githubusercontent.com/u/73002588?v=4",
      places: 3,
    },
    {
      id: "u2",
      name: "Pengfei",
      image:
        "https://avatars.githubusercontent.com/u/73002588?v=4",
      places: 3,
    },
    {
      id: "u3",
      name: "Pengfei",
      image:
        "https://avatars.githubusercontent.com/u/73002588?v=4",
      places: 3,
    },
    {
      id: "u4",
      name: "Pengfei",
      image:
        "https://avatars.githubusercontent.com/u/73002588?v=4",
      places: 3,
    },
    {
      id: "u5",
      name: "Pengfei",
      image:
        "https://avatars.githubusercontent.com/u/73002588?v=4",
      places: 3,
    },
    {
      id: "u6",
      name: "Pengfei",
      image:
        "https://avatars.githubusercontent.com/u/73002588?v=4",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
