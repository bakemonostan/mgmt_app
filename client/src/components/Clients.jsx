import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import ClientRow from './ClientRow';
import Loading from './Loading';

const Clients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h2 className='text-2xl text-gray-800 font-light'>Clients</h2>
      <table className='table ta-hover mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
