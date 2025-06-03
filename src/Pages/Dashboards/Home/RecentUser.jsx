import useUser from "../../../components/hook/useUser";


const RecentUser = () => {
  const { users, loading, error } = useUser();
  const sliceUser = users.slice(0, 5);

console.log(users);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users!</div>;

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
              <td className="py-3 px-4 text-left">{user.userProfile.nickname || 'N/A'}</td>
              <td className="py-4 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.userProfile.phone || 'N/A'}</td>
              <td className="py-3 px-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUser;
