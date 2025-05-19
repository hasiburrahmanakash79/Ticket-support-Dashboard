const initialUsers = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    number: "+12345678901",
    usertype: "customer",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    number: "+12345678902",
    usertype: "distributor",
  },
  {
    name: "Carol Davis",
    email: "carol.davis@example.com",
    number: "+12345678903",
    usertype: "customer",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    number: "+12345678904",
    usertype: "distributor",
  },
  {
    name: "Eva Brown",
    email: "eva.brown@example.com",
    number: "+12345678905",
    usertype: "customer",
  },
  {
    name: "Frank Miller",
    email: "frank.miller@example.com",
    number: "+12345678906",
    usertype: "distributor",
  },
  {
    name: "Grace Lee",
    email: "grace.lee@example.com",
    number: "+12345678907",
    usertype: "customer",
  },
  {
    name: "Henry Clark",
    email: "henry.clark@example.com",
    number: "+12345678908",
    usertype: "distributor",
  },
];

const RecentUser = () => {
  const sliceUser = initialUsers.slice(0, 5);

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
      <h2 className="text-2xl font-semibold mb-5">User</h2>
      <table className="min-w-full bg-white rounded-xl text-center">
        <thead>
          <tr className="text-sm bg-blue-50">
            <th className="p-4 text-left">User Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Number</th>
            <th className="p-4">User Type</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          {sliceUser.map((user, idx) => (
            <tr key={idx} className="border-t border-gray-200">
              <td className="py-3 px-4 text-left">{user.name}</td>
              <td className="py-4 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.number}</td>
              <td className="py-3 px-4">{user.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUser;
